# E-mail setup

Form notifications (contact + registration) are sent through the **Gmail API** as a Google
Workspace user. Mailgun was retired because Gmail filed its messages as spam even though
SPF/DKIM passed: the sender was a role address on a young transactional subdomain, the body
was HTML-only, and the Reply-To pointed at an arbitrary external domain.

Sending through Gmail makes the notification internal mail: aligned SPF/DKIM/DMARC on
`scoutinglommel.be`, no shared sending IPs, no external relay.

## How it works

```
Contact form ──┐
               ├─ POST /api/send-email ──────┐
Register form ─┴─ POST /api/register-member ─┴─ handleSendEmail()
                                                  ├─ render template → text/plain + text/html
                                                  ├─ build RFC 5322 MIME (base64url)
                                                  └─ JWT(service account, gmail.send, subject=<user>)
                                                     → gmail.googleapis.com/gmail/v1/users/me/messages/send
```

- `src/lib/services/gmail.ts` — JWT + `fetch` transport (same pattern as `google-sheets.ts`).
- `src/lib/services/mime.ts` — RFC 5322 builder: `multipart/alternative`, `text/plain` first,
  `text/html` second, UTF-8 headers encoded as `=?UTF-8?B?…?=`.
- `src/lib/api/forms/handle-send-email.tsx` — renders the template and sends.
- `src/lib/api/forms/form-email.ts` — validates the request body and resolves the recipient.

## Client contract

The browser never supplies `From` or `To`. It sends a recipient key; the server maps it to an
address:

| `recipient`                          | Address                            |
| ------------------------------------ | ---------------------------------- |
| `general`                            | `info@scoutinglommel.be`           |
| `rentals`                            | `verhuur@scoutinglommel.be`        |
| `register`                           | `inschrijvingen@scoutinglommel.be` |
| `group` + `group` (a `Groups` value) | `<group>@scoutinglommel.be`        |

`/api/send-email` accepts `general`, `rentals` and `group`; `/api/register-member` accepts only
`register`. Unknown keys return `400` before the Turnstile check.

## Environment

| Variable                         | Purpose                                                                     |
| -------------------------------- | --------------------------------------------------------------------------- |
| `GOOGLE_GMAIL_SERVICE_ACCOUNT`   | Service account `client_email`                                              |
| `GOOGLE_GMAIL_PRIVATE_KEY`       | Private key, `\n`-escaped                                                   |
| `GOOGLE_GMAIL_KEY_ID`            | Optional key id                                                             |
| `GOOGLE_GMAIL_IMPERSONATE_EMAIL` | Real Workspace mailbox the JWT is signed for                                |
| `GOOGLE_GMAIL_FROM`              | `Scouting Sint-Pieter Lommel <noreply@scoutinglommel.be>`                   |
| `NEXT_PUBLIC_EMAIL_DEV_OVERRIDE` | Redirects every notification here (staging/preview)                         |

The sender identity is **`noreply@scoutinglommel.be`**, added as an alternate email (alias) on
the impersonated mailbox in the Admin console. A subdomain such as `mail.scoutinglommel.be` was
considered and rejected: it would need its own verified secondary domain, MX, SPF and DKIM, and
it reintroduces the young-subdomain reputation problem this change exists to remove.

`GOOGLE_GMAIL_FROM` must be the impersonated mailbox or a "Send mail as" alias authorised for
it, otherwise Gmail rejects the send with `403`.

## Google Workspace (one-time)

1. Create a service account and JSON key (`gmail-sender@<project>.iam.gserviceaccount.com`).
2. Admin console → Security → Access and data control → API controls → Domain-wide delegation →
   add the client ID with scope `https://www.googleapis.com/auth/gmail.send`.
3. The impersonated address must be a real mailbox. Google Groups and standalone aliases
   cannot be impersonated.

See `.agents/skills/deployment/SKILL.md` for which Vercel environments carry the values.

## Limits

2,000 messages/day per mailbox, 100 recipients per message, 25 MB per message. Abuse is
bounded by Turnstile plus the server-side recipient allowlist.

## Strapi

The Strapi admin uses SMTP (`smtp.gmail.com:465`) with an app password, configured in the
`admin.scoutinglommel.be` repo. Different transport, same sending identity.

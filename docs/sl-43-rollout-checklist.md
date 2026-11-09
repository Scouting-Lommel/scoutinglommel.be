# SL-43 rollout checklist

Step-by-step tasks to get form notifications off Mailgun and onto Google Workspace, in the
order that avoids breaking the live site. Tick items off as they are done.

**Owner key:** 👤 = you (Workspace / console access) · 🤖 = me (code, merges, verification)

**Where things stand**

| Item                                                                                | State                                                          |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Frontend PR [#167](https://github.com/Scouting-Lommel/scoutinglommel.be/pull/167)   | open, lint and preview green                                   |
| Strapi PR [#92](https://github.com/Scouting-Lommel/admin.scoutinglommel.be/pull/92) | open, build green                                              |
| Sender identity                                                                     | decided: `noreply@scoutinglommel.be` (alias on a real mailbox) |
| Workspace credentials                                                               | not created yet — blocks both PRs                              |
| Mailgun                                                                             | still live in production (rollback path)                       |

**Order matters:** do not merge #167 before phase 4 is done, or the staging forms return
`500 Email is not configured`.

---

## Phase 1 — Sender mailbox and app password 👤

- [ ] Pick the mailbox that will own the sender identity (a real user mailbox, e.g. an existing
      info/admin account). Groups and standalone aliases cannot be impersonated.
- [ ] In `admin.google.com` → **Directory → Users** → open that user → **Add alternate emails** →
      add `noreply` → Save. Confirm `noreply@scoutinglommel.be` is listed.
- [ ] On that same account, turn on **2-Step Verification** (`myaccount.google.com/security`).
- [ ] Create an **app password** (`myaccount.google.com/security` → App passwords → app "Mail",
      device "Strapi"). Copy the 16 characters; spaces do not matter.
      If "App passwords" is missing, 2SV is off or the admin policy blocks app passwords.
- [ ] In that user's Gmail: **Settings → Accounts → Send mail as → Add another email address** →
      name `Scouting Sint-Pieter Lommel`, address `noreply@scoutinglommel.be` → **Treat as an
      alias** checked → verify with the confirmation mail (it arrives in the same inbox).
      Needed so Gmail accepts that From; without it the API returns `403`.

## Phase 2 — Google Cloud service account (frontend, Gmail API) 👤

- [ ] In `console.cloud.google.com`, pick the project that already holds the other service
      accounts (Sheets/Admin) so credentials stay in one place.
- [ ] **IAM & Admin → Service accounts → Create service account** → name `gmail-sender` →
      Create.
- [ ] Open it → **Keys → Add key → Create new key → JSON** → download the file. Keep it out of
      the repo.
- [ ] Read these three values from the JSON: `client_email`, `private_key`, `private_key_id`,
      plus `client_id`.

## Phase 3 — Domain-wide delegation 👤

- [ ] In `admin.google.com` → **Security → Access and data control → API controls →
      Domain-wide delegation → Add new**.
- [ ] Client ID: the `client_id` from the JSON key.
- [ ] OAuth scopes: `https://www.googleapis.com/auth/gmail.send` (exactly this, no more).
- [ ] **Authorize**. Allow up to a few minutes (occasionally longer) before it takes effect.

## Phase 4 — Environment variables 👤

**Vercel** — project `staging.scoutinglommel.be` → Settings → Environment Variables, add for
**Production** (that environment serves the staging domain) and Preview if you want branches to
send:

- [ ] `GOOGLE_GMAIL_SERVICE_ACCOUNT` = `client_email`
- [ ] `GOOGLE_GMAIL_PRIVATE_KEY` = `private_key` (paste with real line breaks, or with `\n`; both work)
- [ ] `GOOGLE_GMAIL_KEY_ID` = `private_key_id`
- [ ] `GOOGLE_GMAIL_IMPERSONATE_EMAIL` = the mailbox from phase 1
- [ ] `GOOGLE_GMAIL_FROM` = `Scouting Sint-Pieter Lommel <noreply@scoutinglommel.be>`
- [ ] Check `NEXT_PUBLIC_EMAIL_DEV_OVERRIDE` on staging: set it to a mailbox you can read, or
      clear it to deliver to the real recipients (`info@` / `verhuur@` / `inschrijvingen@`).
- [ ] Redeploy the staging project so the new variables are baked in.

**Coolify** — the Strapi resource for `admin.scoutinglommel.be` → Environment Variables:

- [ ] `SMTP_HOST=smtp.gmail.com`
- [ ] `SMTP_PORT=465`
- [ ] `SMTP_SECURE=true`
- [ ] `SMTP_USERNAME` = the mailbox from phase 1
- [ ] `SMTP_PASSWORD` = the app password
- [ ] `EMAIL_FROM=Scouting Sint-Pieter Lommel <noreply@scoutinglommel.be>`
- [ ] `EMAIL_REPLY_TO=Scouting Sint-Pieter Lommel <noreply@scoutinglommel.be>`
- [ ] Save. No manual redeploy needed — the merge in phase 5 triggers it.

## Phase 5 — Merge and verify 👤🤖

- [ ] 👤 Tell me the phase 4 variables are in.
- [ ] 🤖 Merge Strapi [#92](https://github.com/Scouting-Lommel/admin.scoutinglommel.be/pull/92);
      CI deploys to Coolify on merge to `main`.
- [ ] 👤 In the Strapi admin login screen, request a password reset for an admin account.
- [ ] 👤 Confirm the mail arrives and opens `Show original`: `spf=pass`, `dkim=pass`,
      `dmarc=pass` for `scoutinglommel.be`, From is `noreply@`.
- [ ] 🤖 Merge frontend [#167](https://github.com/Scouting-Lommel/scoutinglommel.be/pull/167);
      staging auto-deploys.
- [ ] 👤 Sign in to `staging.scoutinglommel.be` and submit the **contact form** with a real
      address in the e-mail field.
- [ ] 👤 Confirm delivery and check `Show original`: not spam, both `text/plain` and `text/html`
      parts, `Reply-To:` is the submitted address, SPF/DKIM/DMARC pass.
- [ ] 👤 Reply to the notification and confirm it reaches the submitter's address.
- [ ] 👤 Submit the **registration form**; confirm the notification arrives and the row still
      appears in the Google Sheets registration sheet.
- [ ] 🤖 Run the negative check: `POST /api/send-email` with a foreign `to` returns `400`.
- [ ] 🤖 Move SL-43 to `Acceptancy` (needs your permission at that point).

## Phase 6 — Production release 👤🤖

- [ ] 👤 Add the same five `GOOGLE_GMAIL_*` variables to the **production** Vercel project
      (`scoutinglommel.be`).
- [ ] 🤖 Bump `package.json`, merge, tag `v2.13.3`, push the tag after your confirmation.
      This release also carries SL-48 (dependency advisories).
- [ ] 👤 Submit the contact and registration forms once on production; check headers again.
- [ ] 🤖 Move SL-43 to `Done` (needs your permission at that point).

## Phase 7 — Cleanup 👤

- [ ] Remove `MAILGUN_API_KEY` from both Vercel projects.
- [ ] Keep the `mg.scoutinglommel.be` Mailgun domain and its DNS records for **30 days** as a
      rollback path, then delete.
- [ ] Rotate the app password if the mailbox password changes (that revokes it automatically).
- [ ] Optional follow-up (separate ticket, out of scope here): tighten the root SPF record from
      `+all` and add `rua=` to the root DMARC record.

## If something fails

| Symptom                                   | Likely cause                                       | Fix                                                            |
| ----------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `403` from Gmail API, "Delegation denied" | delegation not saved yet, or wrong client ID/scope | recheck phase 3, wait, retry                                   |
| `403` "You are not allowed to send as…"   | From is not a verified send-as alias               | phase 1, Gmail "Send mail as"                                  |
| `500 Email is not configured`             | `GOOGLE_GMAIL_FROM` missing                        | phase 4, redeploy                                              |
| Strapi reset mail not sent, no error      | app password wrong, or 2SV/policy blocking         | create the app password again                                  |
| Mail lands in spam again                  | From domain or headers changed                     | check `Show original`; DKIM domain must be `scoutinglommel.be` |

---

## Other open work (not part of SL-43)

- [ ] **SL-44** — Strapi MCP server sits in `Acceptancy`; verify and close.
- [ ] **SL-46** — Strapi 5.61 upgrade + dependency audit (backend repo, high).
- [ ] **SL-11** — split the SEO/GEO umbrella ticket into shippable tickets.
- [ ] **SL-35** — location fields on the Strapi event content-type.
- [ ] **SL-5** — Google Analytics.

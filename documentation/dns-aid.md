# DNS-AID record for agent discovery

[DNS-AID](https://www.ietf.org/archive/id/draft-ietf-httpapi-dns-aid-03.html)
(draft-ietf-httpapi-dns-aid) lets agents auto-discover what a site supports
through DNS `SVCB`/`HTTPS` records under `_agents.<zone>`, secured by DNSSEC.

## Current state

- **DNSSEC**: already enabled for `scoutinglommel.be` (Cloudflare signs the
  zone; DNSKEY records confirmed).
- **Records**: not yet published — requires Cloudflare zone access (no API
  token available in the repo, so this is a manual dashboard step).

## Records to add

Cloudflare's DNS dashboard supports native `HTTPS` records. Add one record:

| Type    | Name                  | Content                                   |
| ------- | --------------------- | ----------------------------------------- |
| `HTTPS` | `_index._agents`      | `1 . alpn="h2,h3"`                        |

This is a ServiceMode SVCB record: priority `1`, target `.` (the zone apex —
the site itself), advertising HTTP/2 and HTTP/3.

Why `_index._agents`: DNS-AID distinguishes `_index._agents` (this host is a
content index/discoverable site) from `_a2a._agents` (this host exposes an
agent-to-agent API). Scouting Lommel is a content site with no agent API, so
`_index._agents` is the correct (and honest) service name.

Alternative equivalent `SVCB` record syntax (for providers that don't
support `HTTPS` records):

```dns
_index._agents.scoutinglommel.be. 3600 IN SVCB 1 . alpn="h2,h3"
```

## Verification

After the record propagates (up to 24 h), validate DNSSEC-verified resolution:

```bash
dig +short _index._agents.scoutinglommel.be HTTPS
# expect: 1 . alpn="h2,h3" (or similar v4/v6 variants)

# DNSSEC-authenticated check via DoH
curl -s 'https://dns.google/resolve?name=_index._agents.scoutinglommel.be&type=HTTPS' | jq '.Answer, .Status'
# Status: 0 (NOERROR) and an Answer entry => validated
```

The DNS-AID DoH scanner used by the agent-readiness validation also checks
`_agents.scoutinglommel.be` resolution and DNSSEC chain before trusting the
result.
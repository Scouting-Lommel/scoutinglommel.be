# DNS-AID record for agent discovery

[DNS-AID](https://www.ietf.org/archive/id/draft-ietf-httpapi-dns-aid-03.html)
(draft-ietf-httpapi-dns-aid) lets agents auto-discover what a site supports
through DNS `SVCB`/`HTTPS` records under `_agents.<zone>`, secured by DNSSEC.

## Current state — ✅ RESOLVED (2026-08-17)

| Item                                            | Status                                             |
| ----------------------------------------------- | -------------------------------------------------- |
| `_index._agents` HTTPS record                   | ✅ Published (`1 . alpn="h2,h3"`, signed)           |
| Zone signing (Cloudflare)                       | ✅ Active (DNSKEY + valid RRSIGs on all records)    |
| DS record at `.be` parent (DNS Belgium)         | ✅ Published (`2371 13 2 4A4BC27A...`)              |
| Validating resolvers return the AD flag         | ✅ Yes (1.1.1.1, 8.8.8.8, 9.9.9.9, Cloudflare DoH)  |
| isitagentready.com `discoverability.dnsAid`     | ✅ `pass` — site at level 3 (Agent-Readable)        |

The chain of trust is now complete: the DS record submitted via **Vimexx**
(key tag `2371`, algorithm 13, KSK public key) was accepted by DNS Belgium
and published in the `.be` zone. All major validating resolvers set the
authenticated-data (AD) flag, and isitagentready.com reports
`discoverability.dnsAid.status: "pass"` (site level 3, "Agent-Readable";
level 4 "Agent-Integrated" would require MCP/A2A/API discovery endpoints,
which are deliberately out of scope for this content site).

Historical context: before the fix, the zone was signed but no DS existed
in the parent `.be` zone, so validating resolvers treated the zone as
*insecure* and never set the AD flag — isitagentready.com reported
*"DNS for AI Discovery (DNS-AID) records found, but DNSSEC was not
validated"*.

## Fix: publish the DS record at the registry

The DS record does **not** live in the Cloudflare zone — it lives in the
parent `.be` zone, which only the registry (DNS Belgium) can write. For `.be`
domains, DNS Belgium only accepts DNSSEC changes **via the registrar**
([official statement](https://www.dnsbelgium.be/en/secure/dnssec)). Cloudflare
only auto-publishes DS records for domains registered with Cloudflare
Registrar; ours is registered at **Vimexx**, so the DS record must be
submitted there. (Cloudflare's role is signing + generating the DS record —
Dashboard → DNS → DNSSEC — but it cannot publish it into the `.be` zone.)

1. Cloudflare dashboard → your zone → **DNS → DNSSEC**. Copy the DS record
   shown there (it matches the live KSK, key tag `2371`).
2. Submit it to the registrar (**Vimexx**, my.vimexx.nl). The panel may
   either offer a DNSSEC section on the domain detail page (fields: key tag,
   algorithm, digest type, digest — or key tag, algorithm, flag, public
   key), or it may not be exposed in the panel at all. If you can't find it,
   **open a Vimexx support ticket** asking them to enable DNSSEC for
   `scoutinglommel.be` with the values below (this is a standard registrar
   operation for `.be`).

   DS record values:

   ```
   Key Tag:     2371
   Algorithm:   13 (ECDSAP256SHA256)
   Digest Type: 2 (SHA-256)
   Digest:      4A4BC27AA00EE4D2B9A1EF9B9829ED5D2F07D9AE5A62E135C0129015E8216297
   ```

   (Digest verified against the live KSK with the dnspython reference
   implementation — `dns.dnssec.make_ds` — and matches what DNS Belgium
   published in the `.be` zone.)

   If the panel asks for the **public key** instead (DNS Belgium's registrar
   interface takes the KSK public key and computes the digest itself):

   ```
   Flags:      257 (KSK)
   Protocol:   3
   Algorithm:  13 (ECDSAP256SHA256)
   Public key: mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==
   ```

   Full record form for reference:

   ```dns
   scoutinglommel.be. 3600 IN DS 2371 13 2 4A4BC27AA00EE4D2B9A1EF9B9829ED5D2F07D9AE5A62E135C0129015E8216297
   ```

3. Propagation: DS updates at DNS Belgium typically take minutes to hours
   (allow up to 24 h).

## Verification

After the DS record propagates:

```bash
# 1. DS visible at the parent zone
dig @d.nsset.be scoutinglommel.be DS +short
# expect: 2371 13 2 4A4BC27AA00EE4D2B9A1EF9B9829ED5D2F07D9AE5A62E135C0129015E8216297

# 2. AD flag set by validating resolvers
dig @1.1.1.1 scoutinglommel.be A +dnssec +noall +comments | grep flags
# expect: flags: qr rd ra ad

# 3. DoH view (same resolver isitagentready.com uses)
curl -s 'https://cloudflare-dns.com/dns-query?name=scoutinglommel.be&type=A' \
  -H 'accept: application/dns-json' | jq '.AD'
# expect: true

# 4. DNS-AID record resolves (note: needs dig >= 9.16 for the HTTPS type;
#    older dig silently queries type A instead — use TYPE65 there)
dig @1.1.1.1 _index._agents.scoutinglommel.be HTTPS +short
# expect: 1 . alpn="h2,h3"
```

Then re-run the scan at <https://isitagentready.com> —
`checks.discoverability.dnsAid.status` is now `"pass"` (site level 3,
"Agent-Readable"; verified 2026-08-17).

## Records (published)

| Type    | Name                  | Content                                   |
| ------- | --------------------- | ----------------------------------------- |
| `HTTPS` | `_index._agents`      | `1 . alpn="h2,h3"`                        |

This is a ServiceMode SVCB record: priority `1`, target `.` (the zone apex —
the site itself), advertising HTTP/2 and HTTP/3.

Why only `_index._agents`: DNS-AID distinguishes `_index._agents` (this host
is a content index/discoverable site) from `_a2a._agents` (this host exposes
an agent-to-agent API). Scouting Lommel is a content site with no agent API,
so `_index._agents` is the correct (and honest) service name. `_a2a._agents`
and `_well-known._agents` deliberately return NODATA.

Equivalent `SVCB` record syntax (for providers that don't support `HTTPS`
records):

```dns
_index._agents.scoutinglommel.be. 3600 IN SVCB 1 . alpn="h2,h3"
```
# Security Checklist

Pre-deployment security review for production.

---

## Secrets & Environment Variables

- [ ] No secrets committed to Git (`.gitignore` includes `.env`)
- [ ] All secrets use environment variables, not hardcoded
- [ ] `JWT_SECRET` is strong (32+ random characters)
- [ ] `SMTP_PASS` uses app-specific password (not main password)
- [ ] Stripe keys are **live** keys (not test), in production only
- [ ] Database credentials are in environment, not in code
- [ ] `.env` and `.env.local` are in `.gitignore`

**Check:**
```bash
git log --all --full-history -- "**/\.env"     # Ensure no env files committed
grep -r "sk_test_\|sk_live_" src/ backend/    # Check for hardcoded keys
```

---

## Database Security

- [ ] Database uses strong password (20+ chars, mixed case, numbers, symbols)
- [ ] PostgreSQL has automatic backups enabled (Supabase: daily by default)
- [ ] Database connection uses SSL/TLS (REQUIRED=YES in connection string)
- [ ] Database IP whitelist is configured (or use VPC for Render)
- [ ] Sensitive data (passwords, PII) is encrypted or hashed
- [ ] No unencrypted sensitive queries in logs

**Check connection string:**
```
postgresql://user:pass@host:5432/db?sslmode=require
```

---

## API Security

- [ ] CORS is restricted to your domain (not `*` in production)
- [ ] All endpoints validate and sanitize input
- [ ] Authentication required for sensitive endpoints
- [ ] Rate limiting on login/signup endpoints
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Sensitive data never logged (passwords, tokens, PII)
- [ ] API keys for third-party services are rotated regularly

**Check CORS:**
```python
# backend/app/main.py
allowed_origins = ["https://fixora.co.uk", "https://www.fixora.co.uk"]
app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, ...)
```

---

## Authentication & Authorization

- [ ] JWT tokens have expiration (10 days default, can be shorter)
- [ ] Passwords are hashed with bcrypt, not plaintext
- [ ] Password reset requires email verification
- [ ] Failed login attempts are logged
- [ ] Admin routes require admin role check
- [ ] User can only access their own data (not other users)
- [ ] Logout properly invalidates tokens

**Test:**
```bash
# Try accessing /api/admin without admin role — should return 403
curl -H "Authorization: Bearer customer_token" http://localhost:8000/api/admin/repairs
```

---

## Payment Security (Stripe)

- [ ] Card data NEVER touches your server (Stripe handles it)
- [ ] Webhook signature is verified
- [ ] Webhook endpoint logs all events
- [ ] Payment amount is validated server-side (not trusted from frontend)
- [ ] Stripe webhook secret is in environment, not in code
- [ ] Test mode is disabled in production

**Check webhook:**
```python
# Verify signature before processing
import hmac
signature = request.headers.get("Stripe-Signature")
# Implementation should use stripe.Webhook.construct_event()
```

---

## Frontend Security

- [ ] No API keys in frontend code (except Stripe public key, which is public)
- [ ] Sensitive data not stored in localStorage
- [ ] CSRF tokens used if applicable
- [ ] XSS protection: sanitize user input, use React's built-in escaping
- [ ] Content Security Policy (CSP) headers configured
- [ ] Sensitive forms are HTTPS-only

**Check build:**
```bash
npm run build
grep -r "sk_test_\|sk_live_\|DATABASE_URL" dist/
```

---

## Third-Party Services

- [ ] Stripe API key scope is minimal (no unnecessary permissions)
- [ ] Telnyx API key is read-only for SMS sending
- [ ] Sentry DSN only reports errors (doesn't log credentials)
- [ ] Gmail app password has "Send only" permission
- [ ] All service accounts have minimal permissions

---

## Infrastructure & Deployment

- [ ] Render service has auto-deploy from main branch only
- [ ] Vercel deployments require manual approval for main branch (optional)
- [ ] Database backups are automated (daily minimum)
- [ ] Logs are retained but not exposed publicly
- [ ] Server headers include security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] SSL certificate is valid and auto-renewed

**Recommended Render settings:**
- Disk auto-cleanup: enabled
- Health checks: enabled
- Custom domain: HTTPS enforced
- Deployment notifications: Slack/email

---

## Monitoring & Incident Response

- [ ] Error monitoring is enabled (Sentry)
- [ ] Critical errors send notifications
- [ ] Logs are centralized and searchable
- [ ] On-call rotation is set up
- [ ] Incident response plan is documented
- [ ] Security audits are scheduled (quarterly)

---

## Compliance

### GDPR (if serving UK/EU users)

- [ ] Privacy policy is published (/privacy)
- [ ] Users can request data export
- [ ] Users can request data deletion
- [ ] Consent for cookies is obtained
- [ ] Data retention policy is enforced

### PCI DSS (Payment Card Industry)

- [ ] Never store full card numbers
- [ ] Use PCI-compliant payment processor (Stripe ✓)
- [ ] All card data transmission is encrypted
- [ ] Access to payment data is restricted

---

## Incident Response Plan

### If data breach detected:

1. **Immediate:** Isolate affected systems, stop further damage
2. **Investigation:** Determine scope and cause
3. **Notification:** Notify affected users within 72 hours
4. **Remediation:** Fix vulnerability and deploy patch
5. **Review:** Post-incident analysis to prevent recurrence

### If payment processing fails:

1. Alert users (contact form, email)
2. Check Stripe dashboard for webhook issues
3. Verify database connection and logs
4. Redeploy if necessary

### If DDoS attack detected:

1. Enable Cloudflare or similar CDN
2. Rate limit aggressively
3. Notify hosting provider
4. Monitor recovery

---

## Pre-Launch Checklist

Before deploying to production:

- [ ] Secrets manager is set up (Render/Vercel environment vars)
- [ ] Database backups tested and verified
- [ ] SSL certificate is valid and auto-renewing
- [ ] Error monitoring (Sentry) is sending alerts
- [ ] Logs are retained but not exposed
- [ ] CORS is restricted to your domain
- [ ] Admin routes require authentication
- [ ] Payment processing is tested end-to-end
- [ ] SMS delivery is tested with real number
- [ ] Email delivery is tested
- [ ] Rate limiting is configured
- [ ] Security headers are set
- [ ] Monitoring and alerting is active

---

## Ongoing Security Tasks

| Task | Frequency | Owner |
|------|-----------|-------|
| Review logs | Daily | DevOps |
| Security updates | Weekly | DevOps |
| Dependency scan | Weekly | DevOps |
| Backup verification | Weekly | DevOps |
| Security audit | Quarterly | Security Team |
| Penetration testing | Annually | External consultant |

---

## Security Tools

- **Dependency Scanning:** Snyk, GitHub Dependabot
- **SAST (Code Analysis):** SonarQube, Pylint
- **Secrets Scanning:** GitHub, Snyk
- **SSL Testing:** SSL Labs (https://www.ssllabs.com/ssltest/)
- **OWASP:** Top 10 vulnerabilities checklist

---

## Resources

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **NIST Cybersecurity:** https://www.nist.gov/cyberframework
- **CWE Top 25:** https://cwe.mitre.org/top25/
- **Stripe Security:** https://stripe.com/docs/security

---

## Support

For security issues:
- **Do NOT** open public GitHub issues
- Email: security@fixora.com (replace with your email)
- Follow responsible disclosure practices

---

**Last Updated:** June 2026  
**Next Review:** Before production launch

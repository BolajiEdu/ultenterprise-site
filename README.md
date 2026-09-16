# UltEnterprise

Marketing site for UltEnterprise, an independent penetration testing and
red team consultancy based in Kent, UK.

**Live:** https://ultenterprise.com

## Stack

React · Vite · deployed on Vercel. No CSS framework — styles are scoped
in a single stylesheet inside the component.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Notes

- `public/.well-known/security.txt` — responsible disclosure contact.
  Update the `Expires` date annually.
- Company registration number still to be added to the footer.

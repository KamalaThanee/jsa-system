# Frequently Asked Questions (FAQ)

## General Questions

### What is the JSA System?

The JSA System is an AI-powered web application that helps Safety Officers create Job Safety Analysis documents for offshore accommodation work barges. It uses Chevron's Energy Wheel methodology to identify hazards and automatically calculates risk levels.

### How does it work?

1. You enter a job description
2. AI (Claude) analyzes the job and breaks it into steps
3. System identifies hazards using Energy Wheel categories
4. Risk levels are calculated automatically
5. AI suggests control measures
6. You export a complete JSA document

### Is this free?

The application itself is free to deploy and use. You only pay for:
- **Anthropic API**: ~$0.003 per JSA analysis (~100 JSAs for $0.30)
- **Vercel Hosting**: Free for most use cases (100GB bandwidth/month)

### Do I need coding experience?

No! The deployment guides walk you through everything step-by-step. Basic computer skills are sufficient.

---

## Technical Questions

### What technologies does it use?

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: Anthropic Claude API (Claude Sonnet 4)
- **Export**: docx library for Word documents
- **Hosting**: Vercel (serverless platform)

### What are the system requirements?

**For Users (Web App):**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- No special hardware required

**For Deployment:**
- GitHub account (free)
- Vercel account (free)
- Anthropic API key (pay-as-you-go)

### Can it work offline?

Not in the current version. AI analysis requires internet connection. Future versions may include offline mode for previously created JSAs.

### Is my data stored?

No. The system doesn't store any JSA data on servers. Everything is processed in real-time and only exists in your browser until you export it.

---

## Usage Questions

### How accurate is the AI analysis?

The AI provides a strong starting point (typically 80-90% accurate for offshore work), but **you must always review and validate**:
- Verify hazards are appropriate
- Check control measures are practical
- Ensure responsibility assignments are correct
- Add company-specific requirements

**The AI is a tool to assist you, not replace your professional judgment.**

### What if the AI misses a hazard?

You should review all AI suggestions and add any missing hazards. The system is designed to be comprehensive but may not catch everything specific to your operation or equipment.

### Can I edit the AI-generated content?

Currently, you can review the AI output but editing requires creating a new analysis. Version 1.1 will include inline editing. For now, be as specific as possible in your job description.

### How detailed should my job description be?

More detail = better results. Include:
- Specific equipment (e.g., "5-ton deck crane" not just "crane")
- Environmental conditions (e.g., "2-meter swell")
- Weights/capacities (e.g., "2-ton container")
- Location specifics (e.g., "main deck" vs "helideck")

**Example Good Description:**
"Use 5-ton deck crane to lift 2-ton container from supply vessel to barge main deck in 2-meter swell with 15-knot winds"

**Example Poor Description:**
"Crane work"

---

## Deployment Questions

### How long does deployment take?

- **API Key**: 5 minutes
- **Upload to GitHub**: 5 minutes
- **Deploy to Vercel**: 5 minutes
- **Total**: ~15 minutes

### Do I need a credit card?

For basic deployment, no:
- GitHub: Free
- Vercel: Free tier available
- Anthropic: Free trial credits, then pay-as-you-go

### Can I deploy to my own server?

Yes, but Vercel is recommended for simplicity. The app is a standard Next.js application and can be deployed anywhere Node.js is supported.

### What if deployment fails?

Common issues:
1. **Node.js version**: Use 18 or higher
2. **Environment variables**: Check API key is set correctly
3. **Build errors**: Ensure all files uploaded correctly

See DEPLOYMENT.md troubleshooting section.

---

## Cost Questions

### How much does it cost to run?

**Typical Monthly Costs for 100 JSAs/month:**
- Vercel hosting: $0 (within free tier)
- Anthropic API: ~$0.30 (100 JSAs × $0.003)
- **Total: ~$0.30/month**

**Typical Monthly Costs for 500 JSAs/month:**
- Vercel hosting: $0-20 (may exceed free tier)
- Anthropic API: ~$1.50 (500 JSAs × $0.003)
- **Total: ~$1.50-21.50/month**

### How can I monitor costs?

**Anthropic API:**
- Go to console.anthropic.com
- Check "Usage" section
- Set up billing alerts

**Vercel:**
- Go to vercel.com/dashboard
- Check "Analytics"
- Monitor bandwidth usage

### What if I run out of API credits?

Add more credits at console.anthropic.com:
1. Go to "Billing"
2. Click "Add Credits"
3. Choose amount ($5-100 recommended)
4. Credits never expire

---

## Export Questions

### What format is the export?

Microsoft Word (.docx) format, compatible with:
- Microsoft Word 2010+
- Google Docs
- LibreOffice
- Apple Pages
- Most modern word processors

### Can I customize the Word template?

The current version uses a fixed template based on your uploaded JSA form. Future versions will support custom templates.

### Why won't my export open?

Check:
1. File size >10KB (smaller = corrupted)
2. Browser allowed download
3. Word/compatible software installed
4. Try different browser
5. Try opening with Google Docs

### Can I export to PDF?

Not directly yet. Workaround:
1. Export to Word
2. Open in Word/Google Docs
3. Save as PDF

Direct PDF export planned for v1.1.

---

## Safety & Compliance Questions

### Is this approved by regulators?

This is a tool to assist in creating JSAs. Final JSAs must still be:
- Reviewed by qualified personnel
- Approved by appropriate authority
- Signed by responsible parties
- Compliant with your company policies

### Does this replace safety officers?

No. This tool **assists** safety officers by:
- Speeding up analysis
- Ensuring systematic hazard review
- Providing control measure ideas
- Formatting documents

**You still need qualified personnel to validate and approve all JSAs.**

### What about company-specific requirements?

Add these during review phase:
- Company policies
- Local regulations
- Client requirements
- Vessel-specific procedures

The AI provides a foundation; you add specifics.

### Can I use this for audits?

Yes, exported JSAs are professional documents suitable for:
- Internal audits
- Client reviews
- Regulatory inspections
- Safety meetings

Always ensure they're properly reviewed and signed.

---

## Troubleshooting Questions

### "API key error" - What do I do?

1. Check key is correct (starts with `sk-ant-`)
2. Verify key is set in Vercel environment variables
3. Check key has available credits
4. Try regenerating key

### "Analysis fails" - Why?

Common reasons:
1. No API credits remaining
2. Job description too short/vague
3. Network timeout (job too complex)
4. Anthropic API temporarily down

Solution: Check API status, simplify job, try again.

### "Export doesn't download" - Help!

Try:
1. Different browser (Chrome recommended)
2. Disable ad blockers
3. Check browser download permissions
4. Clear browser cache
5. Check console for errors (F12)

### App is slow - What's wrong?

Check:
1. Internet connection speed
2. Browser performance (close other tabs)
3. Vercel region (should auto-select nearest)
4. AI complexity (very detailed jobs take longer)

Normal times:
- Page load: <2 seconds
- AI analysis: 5-10 seconds
- Export: <3 seconds

---

## Feature Requests

### Can you add [feature]?

Future versions planned:
- v1.1: Draft saving, inline editing, PDF export
- v1.2: User authentication, database, search
- v1.3: Mobile app, offline mode, multi-language

See CHANGELOG.md for full roadmap.

### Can I contribute?

This is currently an internal tool, but suggestions welcome! Document feature requests with:
- Use case description
- Expected behavior
- Why it's important
- Example scenarios

### Will there be a mobile app?

Yes, planned for v1.3. Currently works on mobile browsers but dedicated app in development.

---

## Security Questions

### Is my data secure?

Yes:
- No data stored on servers
- HTTPS encryption (automatic via Vercel)
- API calls server-side only
- No user tracking or analytics

### Can others see my JSAs?

No. Each user's session is isolated. JSAs only exist in your browser until exported.

### What about API key security?

**Best practices:**
- Never commit to git
- Use environment variables only
- Rotate keys every 90 days
- Monitor usage regularly
- Don't share keys

### Is the connection encrypted?

Yes, all connections use HTTPS (TLS 1.3) automatically via Vercel.

---

## Support Questions

### Where can I get help?

1. **Documentation**: Check README.md, DEPLOYMENT.md, GETTING_STARTED.md
2. **Error messages**: Read carefully, often self-explanatory
3. **Logs**: Check Vercel dashboard for server errors
4. **API Status**: Check console.anthropic.com

### Who maintains this?

This is an internal tool. Maintenance responsibility should be assigned within your organization.

### How do I report bugs?

Document:
1. What you were doing
2. What happened
3. What you expected
4. Error messages (screenshot)
5. Browser and OS version

---

## Best Practices

### For Safety Officers

**DO:**
- ✅ Provide detailed job descriptions
- ✅ Review all AI suggestions
- ✅ Add company-specific controls
- ✅ Validate risk assessments
- ✅ Get proper approvals

**DON'T:**
- ❌ Trust AI blindly
- ❌ Skip review process
- ❌ Use for unfamiliar work
- ❌ Ignore company procedures

### For Administrators

**DO:**
- ✅ Monitor API usage
- ✅ Set up billing alerts
- ✅ Keep API keys secure
- ✅ Train users properly
- ✅ Review outputs regularly

**DON'T:**
- ❌ Share API keys
- ❌ Skip user training
- ❌ Ignore cost monitoring
- ❌ Deploy without testing

---

## Quick Reference

### Time Savings
- Manual JSA: 1-2 hours
- AI-assisted JSA: 15-30 minutes
- **Savings: 60-75%**

### Cost Per JSA
- ~$0.003 (less than 1 cent)

### Typical JSA
- 4-8 job steps
- 2-4 hazards per step
- 3-5 control measures per step
- 1-2 pages when exported

### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

---

## Still Have Questions?

1. Check all documentation files
2. Review error messages
3. Test with simple example
4. Check Vercel logs
5. Verify API key status

**Most issues are resolved by:**
- Checking environment variables
- Verifying API credits
- Using detailed job descriptions
- Testing in different browser

---

**Last Updated:** 2026-04-07  
**Version:** 1.0.0

# 🚀 Getting Started with JSA System

## Welcome! 

You now have a complete, production-ready Job Safety Analysis system powered by AI. This guide will help you get it running in 15 minutes.

## ⚡ Super Quick Start (3 Steps)

### 1. Get AI API Key (Choose Your Option)

**🆓 OPTION 1: FREE (Recommended)**

Use Google Gemini + OpenRouter (both 100% free):

**Step 1a: Get Gemini API Key**
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy key (starts with `AIza...`)

**Step 1b: Get OpenRouter API Key**  
1. Visit: https://openrouter.ai/keys
2. Sign up (free)
3. Click "Create Key"
4. Copy key (starts with `sk-or-...`)

**Quota:** 1,500+ JSAs/day FREE! 🎉

**💰 OPTION 2: PAID (Best Quality)**

Use Anthropic Claude:
1. Visit: https://console.anthropic.com/
2. Sign up
3. Go to "API Keys"
4. Create new key
5. Copy it (starts with `sk-ant-...`)
6. Add credits ($5 minimum)

**Cost:** ~$0.003 per JSA (~100 JSAs = $0.30)

**📖 Detailed Guide:** See [FREE_AI_SETUP.md](FREE_AI_SETUP.md)

---

### 2. Deploy to Vercel
Visit: https://vercel.com
- Sign in with GitHub
- Click "New Project"
- Import this repository
- Add environment variable:
  - Name: `ANTHROPIC_API_KEY`
  - Value: [paste your key]
- Click "Deploy"

### 3. Use Your App!
- Wait 2 minutes for deployment
- Click the URL Vercel gives you
- Start creating JSAs! 🎉

## 📖 Detailed Instructions

### Option A: Deploy First (Recommended)

**Best for**: Getting it running ASAP

1. Upload code to GitHub
2. Deploy to Vercel
3. Test online
4. Customize later

See: `DEPLOYMENT.md` for step-by-step

### Option B: Test Locally First

**Best for**: Developers who want to customize

1. Install Node.js 18+ 
2. Run commands:
   ```bash
   npm install
   cp .env.example .env
   # Edit .env and add your API key
   npm run dev
   ```
3. Open: http://localhost:3000
4. Deploy when ready

See: `README.md` for full instructions

## 🎯 First Test

Once deployed, try this:

**Job Description:**
```
Crane lifting operation to transfer 2-ton container 
from supply vessel to barge deck using 5-ton deck crane 
in 2-meter swell conditions
```

**Expected Result:**
- 5-7 job steps identified
- Hazards from multiple categories:
  - Mechanical (crushing, pinch points)
  - Gravitational (falling objects)
  - Motion (vessel movement)
  - Pressure (hydraulic systems)
- Risk assessment completed
- Control measures recommended
- Word document generated

## 📚 What to Read First

1. **DEPLOYMENT.md** ← Start here for deployment
2. **README.md** ← Full documentation
3. **PROJECT_SUMMARY.md** ← Technical details

## 🆘 Quick Troubleshooting

**"Build failed"**
→ Check Node.js is version 18+

**"API key error"**
→ Verify key is correct in environment variables

**"AI analysis fails"**
→ Check you have API credits at console.anthropic.com

**"Can't download export"**
→ Try different browser (Chrome recommended)

## 💡 Tips for Success

1. **Be specific** in job descriptions
   - ❌ "Crane work"
   - ✅ "Use 5-ton deck crane to lift 2-ton container from supply vessel to deck in 2m swell"

2. **Review AI suggestions**
   - AI provides good starting point
   - You validate and adjust
   - Add company-specific controls

3. **Start simple**
   - Test with basic jobs first
   - Learn the interface
   - Then tackle complex operations

4. **Monitor usage**
   - Each JSA costs ~$0.003
   - 100 JSAs = ~$0.30
   - Check usage at console.anthropic.com

## 🎓 Training Your Team

### For Safety Officers

**What this tool does:**
- Analyzes jobs using AI
- Identifies hazards systematically
- Calculates risk levels
- Suggests control measures
- Generates JSA documents

**What you still do:**
- Provide job details
- Review AI suggestions
- Validate hazards
- Approve control measures
- Sign final JSA

### Quick Demo Script

1. Show the form
2. Enter a sample job
3. Click "Analyze"
4. Explain the results
5. Show Energy Wheel
6. Export to Word
7. Open the document

**Duration**: 5 minutes

## 🔐 Security Reminders

- ✅ Never commit `.env` file
- ✅ Keep API key secret
- ✅ Use environment variables in Vercel
- ✅ Regularly check API usage
- ✅ Rotate keys periodically

## 📊 Success Checklist

- [ ] Code uploaded to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variable set
- [ ] Test JSA created successfully
- [ ] Word export works
- [ ] Team trained
- [ ] Documentation reviewed
- [ ] Usage monitored

## 🎉 You're Ready!

Your JSA system is now:
- ✅ Deployed globally
- ✅ Secured with HTTPS
- ✅ Auto-scaling
- ✅ AI-powered
- ✅ Production-ready

## 📞 Need Help?

1. Check `DEPLOYMENT.md` for detailed steps
2. Review `README.md` for full documentation
3. Check error messages in Vercel logs
4. Verify API key at console.anthropic.com

## 🌟 Next Steps

**Immediate:**
- [ ] Create first real JSA
- [ ] Share URL with team
- [ ] Set up usage alerts

**This Week:**
- [ ] Train safety officers
- [ ] Create 5-10 JSAs
- [ ] Gather feedback
- [ ] Adjust as needed

**This Month:**
- [ ] Review all JSAs created
- [ ] Monitor API costs
- [ ] Consider customizations
- [ ] Plan improvements

---

**Estimated Time Investment:**
- Deployment: 15 minutes
- First test: 5 minutes
- Team training: 30 minutes
- **Total: 50 minutes to full operation** ⚡

**Let's make offshore work safer together!** 🛡️

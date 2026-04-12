# JSA System - Offshore Safety Analysis Platform

AI-Powered Job Safety Analysis System for Offshore Accommodation Work Barges

## 🎯 Features

- **AI-Powered Analysis**: Utilizes Claude AI (Anthropic) to analyze work tasks and identify hazards
- **Chevron Energy Wheel Framework**: Systematic hazard identification across 10 energy categories
- **Automated Risk Assessment**: Calculates initial and residual risk based on company matrix
- **Control Measures Recommendation**: AI suggests specific, practical safety controls
- **Word Document Export**: Generates completed JSA forms in .docx format
- **Offshore-Specific**: Designed specifically for accommodation work barge operations

## 🆓 Zero Cost AI Option (NEW!)

The system now supports **100% FREE AI providers** with automatic failover:

1. **Google Gemini** (Primary - FREE)
   - 1,500 requests/day free
   - Fast and reliable
   
2. **OpenRouter** (Backup - FREE)  
   - Free models available
   - Automatic failover when Gemini reaches limit

3. **Anthropic Claude** (Optional - Paid)
   - Use as final fallback
   - Best quality but costs ~$0.003/JSA

**📖 See [FREE_AI_SETUP.md](FREE_AI_SETUP.md) for detailed setup guide**

### Quick Setup

Get your free API keys:
- **Gemini**: https://aistudio.google.com/app/apikey
- **OpenRouter**: https://openrouter.ai/keys

Add to Vercel environment variables and you're done!

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- GitHub account (for deployment)
- Vercel account (free tier works)

### Local Development

1. **Clone or download this project**

2. **Install dependencies**
   ```bash
   cd jsa-system
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to Vercel

### Method 1: Deploy via GitHub

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/jsa-system.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - Add `ANTHROPIC_API_KEY` with your API key
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
   Paste your API key when prompted

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude API (Anthropic)
- **Document Generation**: docx library
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Usage Guide

### Creating a JSA

1. **Enter Basic Information**
   - Vessel Code, Name, Client
   - Location and environmental conditions
   - Job description (be specific!)

2. **Click "Analyze Job with AI"**
   - AI will break down the job into steps
   - Identify hazards using Energy Wheel
   - Assess initial risk
   - Recommend control measures
   - Calculate residual risk

3. **Review Results**
   - Check each job step
   - Verify hazards are appropriate
   - Review control measures
   - Confirm risk levels

4. **Export to Word**
   - Click "Export to Word"
   - Download the completed JSA form
   - Review and sign as per company procedures

### Energy Wheel Categories

1. **Mechanical** - Pinch points, crushing, shearing
2. **Electrical** - Shock, electrocution, arc flash
3. **Thermal** - Burns, fire, heat/cold stress
4. **Chemical** - Toxic exposure, corrosion
5. **Radiation** - UV, ionizing radiation
6. **Biological** - Infections, contamination
7. **Gravitational** - Falls, falling objects
8. **Pressure** - Pressure vessel failure, gas release
9. **Motion** - Vessel motion, man overboard
10. **Sound** - Hearing loss, communication interference

### Risk Matrix

**Severity (S)**: 1-5 (Insignificant to Fatality)
**Likelihood (L)**: A-E (Very Low to Very High)

**Risk Levels**:
- **LOW**: Acceptable with toolbox talk
- **MED**: Requires express authorization
- **HIGH**: Must not proceed under normal circumstances

## 🔧 Configuration

### API Settings

Edit `app/api/analyze/route.ts` to customize:
- Model selection (default: claude-sonnet-4-20250514)
- Max tokens (default: 4000)
- System prompt customization

### Risk Matrix

Edit `lib/riskMatrix.ts` to modify:
- Risk level thresholds
- Severity descriptions
- Likelihood descriptions
- Risk guidance text

### Energy Wheel

Edit `lib/energyWheel.ts` to add/modify:
- Energy categories
- Hazard lists
- Examples for each category

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Production URL | No |

## 🐛 Troubleshooting

### AI Analysis Fails
- Check API key is correct
- Verify API key has credits
- Check console for error messages

### Export Doesn't Work
- Ensure all required fields are filled
- Check browser console for errors
- Try a different browser

### Deployment Issues
- Verify environment variables are set in Vercel
- Check build logs for errors
- Ensure Node.js version is 18+

## 📄 License

This project is for internal use. Modify as needed for your organization.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Vercel deployment logs
4. Review Anthropic API documentation

## 🔐 Security Notes

- Never commit `.env` file to git
- Keep API keys secure
- Use environment variables for sensitive data
- Regularly rotate API keys
- Review and limit API usage

## 🎓 Training Users

### For Safety Officers

1. **Understanding AI Analysis**
   - AI provides suggestions, not final decisions
   - Always review and validate hazards
   - Add company-specific controls
   - Use professional judgment

2. **Best Practices**
   - Provide detailed job descriptions
   - Include location specifics
   - Specify equipment involved
   - Note environmental conditions

3. **Quality Control**
   - Review each job step
   - Verify control measures are practical
   - Ensure responsibility is clear
   - Validate risk assessments

## 📊 Customization

### Adding Company Logo
1. Add logo to `public/logo.png`
2. Update `app/page.tsx` to include logo

### Modifying Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your company colors
  }
}
```

### Custom Risk Matrix
Edit `lib/riskMatrix.ts` with your company's matrix

## 🚢 Offshore-Specific Features

- Vessel motion considerations
- Weather condition inputs
- Marine environment hazards
- Offshore equipment categories
- Accommodation barge operations
- Personnel transfer risks
- Supply vessel operations

## 📈 Future Enhancements

Potential features for future versions:
- [ ] Save/load JSA drafts
- [ ] PDF export option
- [ ] User authentication
- [ ] JSA database/archive
- [ ] Mobile app version
- [ ] Offline capability
- [ ] Multi-language support
- [ ] Custom templates
- [ ] Analytics dashboard
- [ ] Email notifications

## 🌟 Credits

- **AI**: Powered by Claude (Anthropic)
- **Framework**: Next.js by Vercel
- **Hazard Framework**: Chevron Energy Wheel methodology

---

**Built for offshore safety excellence** 🛡️

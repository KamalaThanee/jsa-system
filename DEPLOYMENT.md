# 🚀 Quick Deployment Guide

## Step-by-Step: GitHub + Vercel Deployment

### Step 1: Get Anthropic API Key (5 minutes)

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-`)
6. Save it securely - you'll need it later!

### Step 2: Upload to GitHub (5 minutes)

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `jsa-system` (or your choice)
   - Select "Public" or "Private"
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Upload your code**
   
   **Option A: Using Git (if installed)**
   ```bash
   cd jsa-system
   git init
   git add .
   git commit -m "Initial commit: JSA System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/jsa-system.git
   git push -u origin main
   ```

   **Option B: Using GitHub Web Interface**
   - Click "uploading an existing file"
   - Drag all project folders/files
   - Click "Commit changes"

### Step 3: Deploy to Vercel (5 minutes)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find your `jsa-system` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   
4. **Add Environment Variable**
   - Click "Environment Variables"
   - Name: `ANTHROPIC_API_KEY`
   - Value: Paste your API key from Step 1
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live! 🎉

### Step 4: Access Your App

1. After deployment completes, you'll see:
   - "Congratulations!" message
   - Your live URL: `https://jsa-system-xxxxx.vercel.app`

2. Click "Visit" to open your JSA System

3. Share the URL with your team!

## 🎯 Testing Your Deployment

1. **Open your app URL**

2. **Test with a sample job**
   ```
   Vessel Code: AWB-001
   Vessel Name: Pacific Endeavor
   Client: Chevron Thailand
   Vessel Location: Gulf of Thailand
   Job Description: Crane lifting operation to transfer 2-ton container from supply vessel to barge deck using 5-ton deck crane
   ```

3. **Click "Analyze Job with AI"**
   - Should take 5-10 seconds
   - Will show 4-8 job steps
   - Each with hazards and controls

4. **Click "Export to Word"**
   - Should download a .docx file
   - Open it to verify formatting

## 🔧 Post-Deployment Setup

### Update Environment Variables

If you need to change your API key later:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to "Settings" → "Environment Variables"
4. Click the three dots next to `ANTHROPIC_API_KEY`
5. Click "Edit"
6. Enter new value
7. Click "Save"
8. **Important**: Redeploy your app:
   - Go to "Deployments"
   - Click three dots on latest deployment
   - Click "Redeploy"

### Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your domain (e.g., `jsa.yourcompany.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

### API Usage Monitoring

Monitor your Anthropic API usage:
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Check "Usage" section
3. Set up billing alerts if needed

## 🆘 Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Make sure all files were uploaded correctly
- Check package.json exists
- Redeploy from GitHub

**Error**: "ANTHROPIC_API_KEY is not defined"
- **Solution**: Add the environment variable in Vercel
- Settings → Environment Variables
- Redeploy

### App Loads but AI Doesn't Work

**Check 1**: API Key Valid?
- Go to Anthropic console
- Verify key is active
- Check credits available

**Check 2**: Environment Variable Set?
- Vercel → Settings → Environment Variables
- Verify ANTHROPIC_API_KEY exists
- Value should start with `sk-ant-`

**Check 3**: Browser Console
- Press F12 in browser
- Check Console tab for errors
- Look for network errors

### Export Doesn't Work

**Issue**: Download doesn't start
- Try different browser (Chrome recommended)
- Check browser allows downloads
- Disable ad blockers temporarily

**Issue**: Word file won't open
- Make sure you have Microsoft Word or compatible software
- Try opening with Google Docs
- Check file isn't corrupted (should be >10KB)

## 📊 Monitoring & Maintenance

### Check App Status
- Vercel Dashboard → Your Project → "Deployments"
- Green checkmark = healthy
- Red X = issue (click for logs)

### Update Code
After making changes:
```bash
git add .
git commit -m "Description of changes"
git push
```
Vercel will auto-deploy!

### View Logs
- Vercel Dashboard → Project → "Functions"
- Click on any function to see logs
- Useful for debugging API issues

## 💰 Cost Breakdown

### Free Tier Includes:
- **Vercel**: 
  - ✅ Unlimited deployments
  - ✅ 100GB bandwidth/month
  - ✅ Automatic HTTPS
  
- **Anthropic API**:
  - 💵 Pay per use
  - ~$0.003 per JSA analysis
  - ~100 JSAs = $0.30
  - Monitor usage in console

### Recommended for Production:
- Start with free tiers
- Monitor usage first month
- Upgrade only if needed
- Anthropic: Add credits as needed

## ✅ Success Checklist

- [ ] Anthropic API key obtained
- [ ] Code uploaded to GitHub
- [ ] Vercel project created
- [ ] Environment variable set
- [ ] Deployment successful
- [ ] Test JSA created
- [ ] Word export working
- [ ] URL shared with team
- [ ] API usage monitored

## 🎓 Next Steps

1. **Train your team**
   - Share the app URL
   - Provide brief demo
   - Explain AI suggestions need review

2. **Customize branding**
   - Add company logo
   - Update colors
   - Modify footer

3. **Set up backups**
   - Keep GitHub repo updated
   - Export important JSAs
   - Document procedures

## 📞 Need Help?

1. Check README.md for detailed docs
2. Review error messages carefully
3. Check Vercel deployment logs
4. Verify API key is correct
5. Test in different browser

---

**Total time to deploy: ~15 minutes** ⚡

**Congratulations on deploying your JSA System!** 🎉

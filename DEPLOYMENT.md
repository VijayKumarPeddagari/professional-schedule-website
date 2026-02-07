# Deployment Guide for Professional Schedule Website

## 🚀 Deploy to Netlify (Recommended)

### Option 1: Quick Deploy via GitHub (Auto-Deploy)

1. **Go to Netlify**: https://app.netlify.com
2. **Click "Add new site"** > **"Import an existing project"**
3. **Connect to GitHub** and select: `VijayKumarPeddagari/professional-schedule-website`
4. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`
5. **Click "Deploy site"**

✅ **Automatic Deployments**: Every push to `main` will trigger a new deployment

---

### Option 2: Deploy via Drag & Drop

1. **Build locally**:
   ```bash
   npm run build
   ```
2. **Zip the `.next` folder**
3. **Go to**: https://app.netlify.com/drop
4. **Drag & drop** your `.next` folder
5. **Your site is live!**

---

## 🌐 Deploy to Vercel (Alternative)

1. **Go to**: https://vercel.com
2. **Click "Add New Project"**
3. **Import**: `VijayKumarPeddagari/professional-schedule-website`
4. **Settings auto-detected**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Click "Deploy"**

---

## 📁 Project Configuration Files

### `vercel.json` (Vercel config)
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### `netlify.toml` (Netlify config)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

---

## 🔧 Deploy via CLI (Optional)

### Netlify CLI:
```bash
# Install (requires sudo or npx)
npx netlify-cli deploy --prod --dir=.next

# Or link to existing site
npx netlify-cli link
npx netlify-cli deploy --prod
```

### Vercel CLI:
```bash
# Install and deploy
npx vercel --prod
```

---

## 📋 After Deployment

### Set Custom Domain (Optional)
1. **Netlify**: Site Settings > Domain Management > Add domain
2. **Vercel**: Domain Settings > Add custom domain

### Environment Variables
Add these in your hosting platform settings if needed:
- `NEXT_PUBLIC_APP_URL`: Your deployed URL

---

## 🎯 Your Deployment URLs

After deployment, your site will be available at:

**Netlify**: `https://professional-schedule-website.netlify.app`

**Vercel**: `https://professional-schedule-website.vercel.app`

---

## ✅ Pre-Deployment Checklist

- [x] Project built successfully with `npm run build`
- [x] Git repository connected
- [x] Changes committed and pushed to GitHub
- [x] Vercel config (`vercel.json`) created
- [x] Netlify config (`netlify.toml`) created
- [x] Ready for auto-deploy on push to `main`

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment


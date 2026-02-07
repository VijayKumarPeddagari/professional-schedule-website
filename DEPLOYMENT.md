# Deployment Guide for Professional Schedule Website

## Option 1: Vercel Deployment (Recommended)

### Step 1: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `VijayKumarPeddagari/professional-schedule-website`
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Step 2: Automatic Deployments
- Every push to `main` branch will automatically trigger a new deployment
- Pull requests will generate preview deployments
- Custom domain can be added in project settings

### Step 3: Environment Variables (if needed)
Add these in Vercel Project Settings:
- `NEXT_PUBLIC_APP_URL`: Your deployed URL

## Option 2: Netlify Deployment

### Step 1: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## Option 3: GitHub Pages Deployment

1. Update `next.config.mjs`:
```javascript
output: 'export',
images: {
  unoptimized: true,
}
```

2. Build the static site:
```bash
npm run build
```

3. Upload `.next/static` and `.next/server` folders to GitHub Pages

## Current Project Status

✅ **Repository**: `VijayKumarPeddagari/professional-schedule-website`
✅ **Framework**: Next.js 16
✅ **Vercel Config**: `vercel.json` created
✅ **Ready for Deployment**

## Quick Deploy Commands

### Deploy to Vercel via CLI (requires authentication):
```bash
npx vercel --prod
```

### Deploy to Netlify via CLI:
```bash
netlify deploy --prod --dir=.next
```

## After First Deployment

1. Add custom domain in Vercel/Netlify settings
2. Set up SSL certificate (automatic)
3. Configure environment variables if needed
4. Enable CI/CD pipeline for automatic deployments

## Troubleshooting

- **Build fails**: Check `npm run build` locally first
- **Images not loading**: Ensure `unoptimized: true` in next.config.mjs
- **API routes not working**: Switch to Vercel/Netlify, not GitHub Pages

## View Your App

After deployment, your app will be available at:
- **Vercel**: `https://professional-schedule-website.vercel.app`
- **Netlify**: `https://professional-schedule-website.netlify.app`


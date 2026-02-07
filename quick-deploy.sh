#!/bin/bash

# 🚀 Quick Deploy Script for Vercel
# Usage: ./quick-deploy.sh

set -e

echo "🎯 Professional Schedule Website - Vercel Deployment"
echo "=================================================="

# Check if user is logged into Vercel
if ! npx vercel whoami &> /dev/null; then
    echo "⚠️  Not logged into Vercel. Please login first:"
    echo "   npx vercel login"
    echo ""
    echo "📋 Or deploy manually:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Click 'Add New Project'"
    echo "   3. Import: VijayKumarPeddagari/professional-schedule-website"
    echo "   4. Click Deploy"
    exit 1
fi

echo "✅ Logged into Vercel"
echo ""
echo "🚀 Starting deployment..."
echo ""

# Deploy to production
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site is now live!"


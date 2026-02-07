#!/bin/bash

# Deploy Script for Professional Schedule Website
# Usage: ./deploy.sh [vercel|netlify]

set -e

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check deployment target
if [ "$1" = "vercel" ]; then
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod
elif [ "$1" = "netlify" ]; then
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod --dir=.next
else
    echo "✅ Build complete!"
    echo "📝 To deploy:"
    echo "   - Vercel: npx vercel --prod"
    echo "   - Netlify: netlify deploy --prod --dir=.next"
    echo ""
    echo "🌐 Or connect your GitHub repository to Vercel/Netlify for auto-deploy!"
fi

echo "✨ Deployment complete!"


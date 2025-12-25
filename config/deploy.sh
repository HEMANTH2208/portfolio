#!/bin/bash

# Portfolio Deployment Script
# This script automates the deployment process to GitHub Pages

echo "🚀 Starting portfolio deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update portfolio website"
fi
git commit -m "$commit_msg"

# Add remote origin if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding remote origin..."
    git remote add origin https://github.com/HEMANTH2208/portfolio.git
fi

# Push to main branch
echo "⬆️ Pushing to main branch..."
git push -u origin main

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
if command -v npm &> /dev/null; then
    npm run deploy
else
    echo "⚠️ npm not found. Please install Node.js to use automated deployment."
    echo "📝 Manual deployment steps:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Navigate to Pages section"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Choose 'main' branch and '/ (root)' folder"
    echo "5. Save the settings"
fi

echo "✅ Deployment process completed!"
echo "🌍 Your portfolio will be available at: https://hemanth2208.github.io/portfolio"
echo ""
echo "📊 Next steps:"
echo "- Wait 5-10 minutes for GitHub Pages to build"
echo "- Check the Actions tab in your repository for build status"
echo "- Test your live website"
echo ""
echo "🔧 Admin Panel Access:"
echo "- Click 'Admin' in the navigation"
echo "- Default password: admin123"
echo "- Remember to change the password in script.js for production!"
@echo off
echo 🚀 Starting portfolio deployment...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
    git branch -M main
)

REM Add all files
echo 📁 Adding files to git...
git add .

REM Commit changes
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update portfolio website
echo 💾 Committing changes...
git commit -m "%commit_msg%"

REM Add remote origin if not exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Adding remote origin...
    git remote add origin https://github.com/HEMANTH2208/portfolio.git
)

REM Push to main branch
echo ⬆️ Pushing to main branch...
git push -u origin main

REM Deploy to GitHub Pages
echo 🌐 Deploying to GitHub Pages...
where npm >nul 2>&1
if %errorlevel%==0 (
    npm run deploy
) else (
    echo ⚠️ npm not found. Please install Node.js to use automated deployment.
    echo 📝 Manual deployment steps:
    echo 1. Go to your GitHub repository settings
    echo 2. Navigate to Pages section
    echo 3. Select 'Deploy from a branch'
    echo 4. Choose 'main' branch and '/ (root)' folder
    echo 5. Save the settings
)

echo ✅ Deployment process completed!
echo 🌍 Your portfolio will be available at: https://hemanth2208.github.io/portfolio
echo.
echo 📊 Next steps:
echo - Wait 5-10 minutes for GitHub Pages to build
echo - Check the Actions tab in your repository for build status
echo - Test your live website
echo.
echo 🔧 Admin Panel Access:
echo - Click 'Admin' in the navigation
echo - Default password: admin123
echo - Remember to change the password in script.js for production!

pause
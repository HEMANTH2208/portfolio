@echo off
echo ========================================
echo    HEMANTH B - PORTFOLIO DEPLOYMENT
echo         Professional Build v2.0.0
echo ========================================
echo.

echo [1/6] Checking prerequisites...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo [2/6] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [3/6] Running code quality checks...
call npm run lint
call npm run validate

echo [4/6] Building optimized version...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo [5/6] Committing changes...
git add .
git status
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=🚀 Deploy portfolio updates - v2.0.0

git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo WARNING: No changes to commit or commit failed
)

echo [6/6] Deploying to GitHub Pages...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    pause
    exit /b 1
)

echo.
echo ========================================
echo    DEPLOYMENT COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo 🌐 Your portfolio will be available at:
echo    https://hemanth2208.github.io/portfolio
echo.
echo 📊 Performance Features:
echo    ✅ PWA Support
echo    ✅ Service Worker Caching
echo    ✅ Advanced Animations
echo    ✅ Admin Panel
echo    ✅ Certificate Management
echo    ✅ Project Management
echo.
echo 🔧 Admin Panel Access:
echo    Password: admin123
echo.
echo 📈 Next Steps:
echo    1. Wait 2-3 minutes for GitHub Pages deployment
echo    2. Test the live site functionality
echo    3. Upload certificates to assets/images/certificates/
echo    4. Add project screenshots to assets/images/projects/
echo    5. Update project GitHub URLs via admin panel
echo.
echo ⭐ Don't forget to star the repository!
echo.
pause
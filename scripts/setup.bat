@echo off
REM Script d'installation pour Pressé Naturel (Windows)

echo 🚀 Installation de Pressé Naturel...
echo.

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé. Veuillez installer Node.js 18+ depuis nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js détecté:
node --version
echo.

REM Installer les dépendances
echo 📦 Installation des dépendances...
call npm install

REM Créer les fichiers d'environnement
if not exist ".env.local" (
    echo 📝 Création du fichier .env.local...
    copy .env.example .env.local
    echo    ⚠️  N'oubliez pas de configurer .env.local
)

REM Créer les dossiers nécessaires
if not exist "public\images" mkdir public\images
if not exist "public\logos" mkdir public\logos

echo.
echo ✅ Installation terminée!
echo.
echo 🎯 Prochaines étapes:
echo 1. Configurez les variables d'environnement dans .env.local
echo 2. Lancez le serveur: npm run dev
echo 3. Ouvrez http://localhost:3000
echo.
echo 📚 Documentation: voir README.md
echo.
pause

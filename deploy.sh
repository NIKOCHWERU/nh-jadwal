#!/bin/bash

# Kantor NH Deployment Script
echo "🚀 Kantor NH - Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "${BLUE}📋 DEPLOYMENT CHECKLIST${NC}"
echo "========================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cp .env.example .env
    echo "${GREEN}✅ Created .env file. Please edit it with your Supabase credentials.${NC}"
    echo ""
    echo "${RED}🛑 STOP: Please edit .env file with your Supabase credentials before continuing.${NC}"
    echo "   Get credentials from: https://supabase.com/dashboard/project/_/settings/api"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "${RED}❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18+${NC}"
    exit 1
fi

echo "${GREEN}✅ Node.js version: $NODE_VERSION${NC}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo "${GREEN}✅ Dependencies installed successfully${NC}"
    else
        echo "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Run build
echo "${YELLOW}🏗️  Building application...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Build successful${NC}"
else
    echo "${RED}❌ Build failed${NC}"
    exit 1
fi

# Check if git repository is initialized
if [ ! -d ".git" ]; then
    echo "${YELLOW}📝 Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Kantor NH application"
    echo "${GREEN}✅ Git repository initialized${NC}"
    echo ""
    echo "${BLUE}🌐 NEXT STEPS:${NC}"
    echo "1. Create GitHub repository: https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/nh-jadwal.git"
    echo "3. Run: git push -u origin main"
    echo "4. Setup GitHub Pages and secrets (see DEPLOY-STEPS.md)"
    exit 0
fi

# Check if remote is set
if ! git remote get-url origin &> /dev/null; then
    echo "${YELLOW}⚠️  Git remote not set. Please set it:${NC}"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/nh-jadwal.git"
    echo ""
    echo "${BLUE}🌐 NEXT STEPS:${NC}"
    echo "1. Set git remote"
    echo "2. Push to GitHub"
    echo "3. Setup GitHub Pages and secrets (see DEPLOY-STEPS.md)"
    exit 0
fi

echo ""
echo "${GREEN}🎉 LOCAL SETUP COMPLETE!${NC}"
echo ""
echo "${BLUE}📋 NEXT STEPS FOR DEPLOYMENT:${NC}"
echo "1. 🌐 Create Supabase project: https://supabase.com"
echo "2. 🗄️  Run database scripts in supabase/ folder"
echo "3. 🔐 Configure GitHub secrets (SUPABASE_URL, SUPABASE_ANON_KEY)"
echo "4. 📤 Push to GitHub to trigger deployment"
echo ""
echo "${YELLOW}📚 For detailed instructions, see: DEPLOY-STEPS.md${NC}"
echo ""
echo "${GREEN}✨ Your application is ready for deployment! ✨${NC}"
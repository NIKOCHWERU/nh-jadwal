# 🚀 Kantor NH - Deployment Instructions

## ⚡ Quick Deployment (10 Minutes)

### Step 1: Create Supabase Project (3 minutes)

1. **Go to [supabase.com](https://supabase.com)**
   - Click "Start your project"
   - Sign up/login with GitHub
   - Click "New Project"

2. **Project Configuration**
   ```
   Organization: Your Name/Organization
   Project Name: kantor-nh
   Database Password: [Create strong password]
   Region: Southeast Asia (or closest to you)
   Pricing Plan: Free tier
   ```

3. **Wait for Project Setup** (1-2 minutes)

### Step 2: Setup Database Schema (2 minutes)

1. **Open SQL Editor**
   - In your Supabase project, click "SQL Editor" in the sidebar
   - Click "New query"

2. **Run Database Schema**
   - Copy the entire content from: `supabase/schema.sql`
   - Paste in SQL Editor
   - Click "Run" ✅

3. **Run Security Policies**
   - Copy the entire content from: `supabase/rls-policies.sql`
   - Paste in SQL Editor
   - Click "Run" ✅

### Step 3: Get Supabase Credentials (30 seconds)

1. **Go to Project Settings**
   - Click the gear icon ⚙️ in sidebar
   - Select "API"

2. **Copy These Values:**
   ```
   Project URL: https://your-project-id.supabase.co
   Anon Public Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Configure Environment Variables (1 minute)

1. **Setup .env file:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

2. **Edit .env file:**
   ```bash
   # Replace with your Supabase credentials
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_APP_NAME="Kantor NH"
   ```

3. **Test Locally (Optional):**
   ```bash
   npm run dev
   # Visit: http://localhost:5173/nh-jadwal/
   ```

### Step 5: Deploy to GitHub Pages (3 minutes)

1. **Initialize Git Repository** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kantor NH application"
   ```

2. **Create GitHub Repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Repository name: `nh-jadwal`
   - Description: "Kantor NH - Office Management System"
   - Make it Public
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nh-jadwal.git
   git branch -M main
   git push -u origin main
   ```

4. **Setup GitHub Actions:**
   - Create folder: `.github/workflows/`
   - Create file: `deploy.yml`
   - Copy content from `.github-workflow-example.yml`

5. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add these secrets:
     ```
     Name: SUPABASE_URL
     Value: https://your-project-id.supabase.co

     Name: SUPABASE_ANON_KEY
     Value: your_anon_key_here
     ```

6. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/root`
   - Click "Save"

7. **Deploy:**
   - Push any changes to trigger deployment:
   ```bash
   git add .
   git commit -m "Setup deployment"
   git push origin main
   ```

8. **Wait for Deployment** (2-3 minutes)
   - Go to Actions tab to see progress
   - Once completed, your app will be live at:
   `https://YOUR_USERNAME.github.io/nh-jadwal/`

### Step 6: Create First Admin User (2 minutes)

1. **Register First User:**
   - Visit your deployed application
   - Click "Daftar di sini" on login page
   - Register with email and password
   - Check email for verification

2. **Make User Admin:**
   - Go back to Supabase SQL Editor
   - Run this query (replace with actual email):
   ```sql
   UPDATE profiles
   SET role = 'ADMIN'
   WHERE email = 'your-admin-email@example.com';
   ```

3. **Login as Admin:**
   - Login with your admin credentials
   - You should now have access to all features including Karyawan page

## 🎯 **Your App is Now Live!**

### What You Get:
- ✅ **Live Application**: Accessible via GitHub Pages
- ✅ **Multi-user Support**: All users connect to same database
- ✅ **Admin Dashboard**: Full access management
- ✅ **Attendance System**: Check-in/out functionality
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Free Hosting**: $0/month with GitHub Pages + Supabase

### Next Steps:
1. **Test All Features**: Create test users, try attendance, etc.
2. **Customize Design**: Modify colors, logo, etc.
3. **Add Users**: Invite team members to register
4. **Monitor Usage**: Check Supabase dashboard

### Troubleshooting:
- **Build Failed**: Check GitHub Actions logs
- **Auth Issues**: Verify Supabase credentials in secrets
- **Database Errors**: Ensure schema.sql and rls-policies.sql were executed
- **404 Errors**: Verify GitHub Pages source is set to `main` branch

## 📞 **Support**

For any issues:
- Check the README.md file
- Review SETUP.md for detailed instructions
- Create GitHub issue for bugs
- Check Supabase documentation: supabase.com/docs

---

🎉 **Congratulations! Your Kantor NH application is now deployed and ready for use!**
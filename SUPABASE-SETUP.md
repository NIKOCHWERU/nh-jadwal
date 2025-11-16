# 🚀 Supabase Setup Guide - Kantor NH

## ✅ **STATUS: CONFIGURED AND READY**

Your Supabase project has been configured in the application! Now you need to complete the database setup.

---

## 📋 **YOUR SUPABASE PROJECT**
- **Project URL**: https://lwlwhjwqfmbkizzzgkzu.supabase.co
- **Status**: Configured in application
- **Next Step**: Complete database setup

---

## 🗄️ **STEP 1: SETUP DATABASE SCHEMA (2 minutes)**

### **Go to Supabase Dashboard**
1. Visit: https://supabase.com/dashboard
2. Select your project: `lwlwhjwqfmbkizzzgkzu`
3. Click on **SQL Editor** in the left sidebar
4. Click **"New query"**

### **Run Database Schema**
1. Open file: `supabase/schema.sql`
2. Copy the entire SQL code
3. Paste into Supabase SQL Editor
4. Click **"Run"** ✅

### **Run Security Policies**
1. Click **"New query"** again
2. Open file: `supabase/rls-policies.sql`
3. Copy the entire SQL code
4. Paste into Supabase SQL Editor
5. Click **"Run"** ✅

---

## 📊 **STEP 2: VERIFY DATABASE SETUP (1 minute)**

### **Check Tables Created**
After running the SQL scripts, you should see these tables:
- ✅ `profiles` - User data and roles
- ✅ `schedules` - Meeting and event schedules
- ✅ `tasks` - Task management
- ✅ `projects` - Project management
- ✅ `teams` - Team management
- ✅ `announcements` - Company announcements
- ✅ `attendances` - Attendance records
- ✅ `activity_logs` - User activity tracking
- ✅ `attendance_settings` - Attendance configuration

### **Check in Supabase Dashboard**
1. Click **"Table Editor"** in the sidebar
2. You should see all the tables listed
3. Click on `profiles` to verify the table structure

---

## 👤 **STEP 3: CREATE FIRST ADMIN USER (2 minutes)**

### **Register First User**
1. Visit your application: https://nikochweru.github.io/nh-jadwal/
2. Click **"Daftar di sini"** on the login page
3. Fill registration form:
   - **Email**: your-admin-email@example.com
   - **Password**: create a strong password
   - **Name**: Your Full Name
   - **Department**: IT
   - **Position**: Administrator
4. Click **"Daftar"**
5. Check your email for verification (if required)

### **Make User Admin**
1. Go back to Supabase SQL Editor
2. Run this query (replace with your actual email):
   ```sql
   UPDATE profiles
   SET role = 'ADMIN'
   WHERE email = 'your-admin-email@example.com';
   ```
3. Click **"Run"** ✅

---

## 🌐 **STEP 4: TEST THE APPLICATION**

### **Login as Admin**
1. Visit: https://nikochweru.github.io/nh-jadwal/
2. Login with your admin credentials
3. You should see:
   - ✅ Dashboard with statistics
   - ✅ Complete sidebar navigation
   - ✅ Access to **Karyawan** page (admin only)
   - ✅ All features working

### **Test Key Features**
- ✅ **Authentication**: Login/logout works
- ✅ **Dashboard**: Data displays correctly
- ✅ **Navigation**: All menu items work
- ✅ **Admin Features**: Can access Karyawan page
- ✅ **Mobile**: Responsive on phone/tablet

---

## 🔧 **STEP 5: CONFIGURE GITHUB SECRETS (Already Done)**

The deployment has been configured with your Supabase credentials:
- ✅ **SUPABASE_URL**: https://lwlwhjwqfmbkizzzgkzu.supabase.co
- ✅ **SUPABASE_ANON_KEY**: Configured in GitHub Actions

---

## 📱 **YOUR LIVE APPLICATION**

### **Application URL**
👉 **https://nikochweru.github.io/nh-jadwal/**

### **Supabase Dashboard**
👉 **https://supabase.com/dashboard/project/lwlwhjwqfmbkizzzgkzu**

---

## 🎯 **WHAT YOU GET**

### **✅ Production Features**
- **Live Web Application**: Working on GitHub Pages
- **Database Connection**: Connected to your Supabase project
- **User Authentication**: Login/Register system active
- **Multi-user Support**: All users connect to same database
- **Admin Controls**: Role-based access control
- **Real-time Ready**: Supabase supports real-time updates
- **Mobile Responsive**: Works on all devices

### **📱 Available Pages**
- **Dashboard** - Overview and statistics
- **Attendance** - Check-in/check-out system
- **Calendar** - Calendar view
- **Schedule** - Meeting management
- **Tasks** - Task management
- **Projects** - Project tracking
- **Team** - Team management
- **Announcements** - Company communications
- **Karyawan** - User management (admin only)
- **Settings** - Profile and preferences

---

## 🚀 **NEXT STEPS**

### **Team Onboarding**
1. **Share Application URL**: https://nikochweru.github.io/nh-jadwal/
2. **Team Registration**: Have team members register
3. **Assign Roles**: Use SQL to set user roles if needed
4. **Training**: Show team how to use features

### **Customization Options**
- **Company Branding**: Modify colors, logo, company name
- **Office Settings**: Configure office location for attendance
- **Workflow**: Customize task statuses, project types
- **Notifications**: Set up email notifications (optional)

---

## 📞 **TROUBLESHOOTING**

### **Common Issues & Solutions**

#### **Login Issues**
- **Problem**: "Invalid login credentials"
- **Solution**: Check if user is confirmed in Supabase Auth tab
- **Solution**: Verify email and password are correct

#### **Database Connection**
- **Problem**: "Database connection failed"
- **Solution**: Verify SQL scripts were executed successfully
- **Solution**: Check if Supabase project URL is correct

#### **Page Not Working**
- **Problem**: 404 errors on some pages
- **Solution**: Check GitHub Pages deployment status
- **Solution**: Verify environment variables are correct

#### **Admin Access Issues**
- **Problem**: Can't access Karyawan page
- **Solution**: Verify user role is set to 'ADMIN' in profiles table
- **Solution**: Refresh the page after role change

---

## 🎉 **CONGRATULATIONS!**

Your **Kantor NH** office management system is now fully operational! 🚀

### **✅ What's Working**
- Live web application with your Supabase database
- Complete authentication system
- All management features
- Multi-user collaboration
- Mobile-responsive design
- Admin controls and permissions

### **🌐 Ready to Use**
Your team can now:
1. Register and login
2. Track attendance
3. Manage tasks and projects
4. Schedule meetings
5. Communicate through announcements
6. Collaborate in real-time

**🎊 Your office management system is LIVE and ready for team use!**

---

## 📚 **SUPPORT**

For any issues:
- **Documentation**: README.md, SETUP.md, DEPLOY-STEPS.md
- **Supabase Dashboard**: https://supabase.com/dashboard/project/lwlwhjwqfmbkizzzgkzu
- **Application**: https://nikochweru.github.io/nh-jadwal/
- **GitHub Repository**: https://github.com/NIKOCHWERU/nh-jadwal
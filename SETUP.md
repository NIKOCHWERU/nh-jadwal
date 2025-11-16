# Setup Guide - Kantor NH

## Quick Start

### 1. Persiapkan Supabase Project

1. **Buat Project Supabase**
   - Buka [supabase.com](https://supabase.com)
   - Sign up/login dengan GitHub atau Google
   - Click "New Project"
   - Pilih organization, beri nama project (misal: "kantor-nh")
   - Pilih database password (catat baik-baik)
   - Pilih region terdekat (misal: Southeast Asia)
   - Click "Create new project"

2. **Jalankan Database Schema**
   - Setelah project dibuat, buka SQL Editor
   - Copy dan paste seluruh isi dari `supabase/schema.sql`
   - Click "Run" untuk membuat semua tabel
   - Copy dan paste isi dari `supabase/rls-policies.sql`
   - Click "Run" untuk setup security policies

3. **Get Project Credentials**
   - Buka menu Project Settings → API
   - Copy "Project URL" (contoh: https://abcdefg.supabase.co)
   - Copy "anon public" key

### 2. Setup Environment Variables

1. **Buat file .env**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file**
   ```env
   # Ganti dengan credentials dari Supabase
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # App configuration
   VITE_APP_NAME="Kantor NH"
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:5173

### 5. User Pertama dan Admin Setup

1. **Register User Pertama**
   - Buka aplikasi di browser
   - Click "Daftar di sini" di login page
   - Register dengan email dan password

2. **Jadikan User Admin**
   - Buka Supabase SQL Editor
   - Jalankan query ini (ganti email dengan email user pertama):
   ```sql
   UPDATE profiles
   SET role = 'ADMIN'
   WHERE email = 'email_user_pertama@example.com';
   ```

3. **Login sebagai Admin**
   - Logout dan login kembali dengan user yang sudah dijadikan admin
   - Sekarang user memiliki akses penuh ke semua fitur

## Deployment ke GitHub Pages

### 1. Push ke GitHub

1. **Initialize Git (jika belum)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push ke GitHub**
   ```bash
   git remote add origin https://github.com/username/nh-jadwal.git
   git branch -M main
   git push -u origin main
   ```

### 2. Setup GitHub Actions

1. **Buat Workflow File**
   - Buat folder: `.github/workflows/`
   - Buat file: `deploy.yml`
   - Copy content dari `.github-workflow-example.yml`

2. **Add GitHub Secrets**
   - Buka repository di GitHub
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Tambahkan:
     - `SUPABASE_URL`: URL dari Supabase project
     - `SUPABASE_ANON_KEY`: Anon key dari Supabase

### 3. Enable GitHub Pages

1. **Repository Settings**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` dan folder: `/root`
   - Save

2. **Automatic Deployment**
   - Setiap push ke main branch akan otomatis deploy
   - Check deployment di Actions tab

## Testing Checklist

### ✅ Basic Features
- [ ] User registration
- [ ] Login/logout functionality
- [ ] Dashboard displays correctly
- [ ] Navigation menu works
- [ ] Mobile responsive

### ✅ Admin Features
- [ ] Admin can access all pages
- [ ] Karyawan page visible for admin only
- [ ] User management works
- [ ] Activity logs visible

### ✅ Attendance System
- [ ] Check-in functionality
- [ ] Check-out functionality
- [ ] Location detection
- [ ] Time tracking works
- [ ] History table displays

### ✅ Security
- [ ] Row Level Security active
- [ ] Users hanya bisa akses data mereka
- [ ] Admin memiliki full access
- [ ] Authentication works correctly

## Troubleshooting

### Common Issues

1. **Build Error: "border-border class does not exist"**
   - Sudah fixed dengan menghapus `@apply border-border` dari globals.css

2. **Login Error: "Invalid login credentials"**
   - Pastikan user sudah register melalui signup page
   - Check email dan password dengan benar

3. **Database Connection Error**
   - Verify Supabase URL dan anon key di .env
   - Pastikan Supabase project sudah aktif

4. **RLS Policy Error**
   - Pastikan RLS policies sudah dijalankan
   - Check SQL editor di Supabase

5. **GitHub Pages Deployment Failed**
   - Verify secrets di GitHub repository settings
   - Check workflow logs untuk error details
   - Pastikan build berhasil di local

### Debug Mode

Untuk enable debug mode, tambahkan di .env:
```env
VITE_DEBUG=true
```

### Reset Database

Untuk reset ke kondisi awal:
```sql
-- Di Supabase SQL Editor
TRUNCATE TABLE attendances CASCADE;
TRUNCATE TABLE activity_logs CASCADE;
TRUNCATE TABLE announcements CASCADE;
TRUNCATE TABLE teams CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE tasks CASCADE;
TRUNCATE TABLE schedules CASCADE;
TRUNCATE TABLE profiles CASCADE;
```

## Production Considerations

### Security
- [ ] Enable RLS di semua tabel
- [ ] Setup proper CORS configuration
- [ ] Use environment variables untuk sensitive data
- [ ] Regular backup database

### Performance
- [ ] Monitor database performance
- [ ] Optimize queries jika perlu
- [ ] Consider caching untuk frequently accessed data
- [ ] Monitor build size dan loading times

### Backup
- [ ] Setup automatic backup database
- [ ] Backup source code di GitHub
- [ ] Documentation maintenance

## Support

Untuk bantuan lebih lanjut:
- **Documentation**: README.md
- **Issues**: GitHub repository issues
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **React Docs**: [react.dev](https://react.dev)
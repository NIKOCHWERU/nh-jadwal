# Kantor NH - Sistem Manajemen Kantor

Aplikasi manajemen kantor lengkap dengan fitur absensi, penjadwalan, manajemen tugas, dan kolaborasi tim. Dibangun dengan React dan Supabase untuk deployment gratis di GitHub Pages.

## 🚀 Fitur

### ✅ Fitur Utama
- **Autentikasi Pengguna** - Login dengan email dan password
- **Dashboard Interaktif** - Overview aktivitas dan statistik
- **Sistem Absensi** - Check-in/check-out dengan foto dan lokasi
- **Sidebar Navigasi** - Responsive dengan mobile support
- **Multi-user Support** - Admin dan User roles
- **Real-time Updates** - Supabase real-time subscriptions

### 📋 Menu Fitur
- **Dashboard** - Overview dan statistik
- **Kalender** - View kalender jadwal
- **Jadwal** - Manajemen meeting dan jadwal
- **Tugas** - Task management dengan status tracking
- **Retainer** - Manajemen proyek dan klien
- **Tim** - Manajemen tim dan departemen
- **Pengumuman** - Announcements dan notifications
- **Karyawan** - User management (Admin only)
- **Pengaturan** - Profile dan preferensi

## 🛠️ Teknologi

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool dan development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Iconify** - Icon system
- **JavaScript ES6+** - Modern JavaScript

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication Service
  - Real-time Subscriptions
  - Row Level Security (RLS)
  - File Storage

### Deployment
- **GitHub Pages** - Static hosting (gratis)
- **GitHub Actions** - Automated deployment

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- Git
- Akun Supabase (gratis)

### 1. Clone Repository
```bash
git clone https://github.com/username/nh-jadwal.git
cd nh-jadwal
```

### 2. Setup Supabase Project
1. Buat project baru di [supabase.com](https://supabase.com)
2. Copy Project URL dan Anon Key
3. Buka SQL Editor dan jalankan:
   - `supabase/schema.sql`
   - `supabase/rls-policies.sql`

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME="Kantor NH"
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Development Server
```bash
npm run dev
```
Buka http://localhost:5173

## 🚀 Deployment ke GitHub Pages

### 1. Setup Repository
1. Push code ke GitHub repository
2. Enable GitHub Pages di repository settings

### 2. Setup GitHub Actions
1. Buat file `.github/workflows/deploy.yml` (contoh tersedia)
2. Add secrets di GitHub repository settings:
   - `SUPABASE_URL`: URL Supabase project
   - `SUPABASE_ANON_KEY`: Anon key dari Supabase

### 3. Automatic Deployment
Setiap push ke branch `main` akan otomatis deploy ke GitHub Pages.

## 👥 User Management

### Role System
- **ADMIN**: Full access ke semua fitur
- **USER**: Akses terbatas sesuai assignment

### Setup Admin User
Setelah user pertama register, jalankan SQL ini di Supabase:
```sql
UPDATE profiles
SET role = 'ADMIN'
WHERE email = 'admin@example.com';
```

## 📊 Database Schema

### Core Tables
- **profiles** - User data dan roles
- **schedules** - Meeting dan jadwal
- **tasks** - Task management
- **projects** - Project dan retainer info
- **teams** - Team management
- **announcements** - Company announcements
- **attendances** - Attendance records
- **activity_logs** - User activity tracking

### Security
- Row Level Security (RLS) enabled
- User data isolation
- Admin override permissions
- JWT authentication

## 🔧 Konfigurasi

### Attendance Settings
Admin dapat mengatur:
- Lokasi kantor (GPS coordinates)
- Jam kerja
- Toleransi keterlambatan
- Require photo untuk check-in/out

### Notification System
Real-time notifications untuk:
- Task assignment
- Schedule reminders
- New announcements
- Project updates

## 📱 Responsive Design

- **Desktop** (≥1024px): Full sidebar dan grid layouts
- **Tablet** (768px-1023px): Collapsible sidebar
- **Mobile** (<768px): Hidden sidebar dengan overlay

## 🎨 Design System

### Colors
- Primary: #A97C09 (Kantor NH brand)
- Secondary: #C4A747
- Light: #F8F7F2
- Success: #2e7d32
- Warning: #f57c00
- Error: #d32f2f

### Typography
- Font: Inter, system-ui, sans-serif
- Icons: Iconify (4000+ icons)

## 🧪 Testing

### Manual Testing
1. Register user baru
2. Test login/logout flow
3. Create schedule dan task
4. Test attendance system
5. Verify admin permissions

### Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Performance

- **Build Size**: <1MB (gzipped)
- **First Load**: <2s on 3G
- **Navigation**: <100ms between routes
- **Database**: <100ms query times

## 🔒 Security Features

- JWT authentication dengan expiration
- httpOnly cookies untuk refresh tokens
- Row Level Security (RLS)
- Input validation dan sanitization
- HTTPS enforcement di production
- Rate limiting pada login attempts

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📝 License

MIT License - lihat [LICENSE](LICENSE) file untuk details.

## 📞 Support

Untuk bantuan atau questions:
- Email: support@kantor-nh.com
- GitHub Issues: [nh-jadwal/issues](https://github.com/username/nh-jadwal/issues)
- Documentation: [Wiki](https://github.com/username/nh-jadwal/wiki)

## 🗺️ Roadmap

### v1.0 (Current)
- ✅ Basic authentication
- ✅ Dashboard dan navigation
- ✅ Attendance system
- ✅ Database structure
- ✅ Responsive design

### v1.1 (Planned)
- 🔄 Enhanced task management
- 🔄 Calendar integration
- 🔄 File attachments
- 🔄 Advanced notifications

### v2.0 (Future)
- 📋 Mobile app (React Native)
- 📋 Reporting dan analytics
- 📋 API integrations
- 📋 Multi-language support

---

**Dibuat dengan ❤️ untuk Kantor NH**
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Attendance = React.lazy(() => import('./pages/Attendance'))
const Kalender = React.lazy(() => import('./pages/Kalender'))
const Jadwal = React.lazy(() => import('./pages/Jadwal'))
const Tugas = React.lazy(() => import('./pages/Tugas'))
const Projects = React.lazy(() => import('./pages/Projects'))
const Team = React.lazy(() => import('./pages/Team'))
const Announcements = React.lazy(() => import('./pages/Announcements'))
const Karyawan = React.lazy(() => import('./pages/Karyawan'))
const Settings = React.lazy(() => import('./pages/Settings'))

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, initialLoading } = useAuth()

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="kalender" element={<Kalender />} />
          <Route path="jadwal" element={<Jadwal />} />
          <Route path="tugas" element={<Tugas />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="settings" element={<Settings />} />

          {/* Admin Only Routes */}
          <Route path="karyawan" element={
            <ProtectedRoute adminOnly>
              <Karyawan />
            </ProtectedRoute>
          } />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
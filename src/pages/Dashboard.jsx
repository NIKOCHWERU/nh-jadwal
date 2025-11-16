import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: 'Tugas Aktif',
      value: '12',
      change: '+2 dari minggu lalu',
      icon: 'tabler:checklist',
      color: 'blue'
    },
    {
      title: 'Proyek Berjalan',
      value: '5',
      change: '1 baru',
      icon: 'tabler:building-community',
      color: 'green'
    },
    {
      title: 'Jadwal Hari Ini',
      value: '3',
      change: '2 meeting',
      icon: 'tabler:calendar-event',
      color: 'yellow'
    },
    {
      title: 'Pengumuman Baru',
      value: '2',
      change: '1 penting',
      icon: 'tabler:alert-circle',
      color: 'red'
    }
  ]

  const priorityTasks = [
    { id: 1, title: 'Selesaikan laporan Q3', priority: 'HIGH', due_date: '2024-01-20' },
    { id: 2, title: 'Meeting dengan klien ABC', priority: 'MEDIUM', due_date: '2024-01-18' },
    { id: 3, title: 'Update dokumentasi API', priority: 'HIGH', due_date: '2024-01-19' },
    { id: 4, title: 'Review proposal proyek', priority: 'MEDIUM', due_date: '2024-01-21' },
    { id: 5, title: 'Setup server development', priority: 'LOW', due_date: '2024-01-25' }
  ]

  const todaySchedules = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '09:00 - 09:15',
      location: 'Meeting Room A',
      type: 'MEETING'
    },
    {
      id: 2,
      title: 'Review Design Project',
      time: '14:00 - 15:00',
      location: 'Meeting Room B',
      type: 'MEETING'
    },
    {
      id: 3,
      title: 'Deadline Submit Laporan',
      time: '17:00',
      location: '-',
      type: 'DEADLINE'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800'
      case 'LOW':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          {user?.role === 'ADMIN' ? 'Selamat datang, Admin! Berikut adalah overview sistem.' : 'Selamat datang kembali! Berikut adalah aktivitas Anda hari ini.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <span className={`iconify text-2xl text-${stat.color}-600`} data-icon={stat.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tugas Prioritas</h2>
          <div className="space-y-3">
            {priorityTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.due_date}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Jadwal Hari Ini</h2>
          <div className="space-y-3">
            {todaySchedules.map((schedule) => (
              <div key={schedule.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                <div className="flex-shrink-0">
                  <span className="iconify text-lg text-gray-400" data-icon="tabler:calendar-event" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{schedule.title}</p>
                  <p className="text-sm text-gray-500">{schedule.time}</p>
                  <p className="text-xs text-gray-400">{schedule.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline - Admin Only */}
      {user?.role === 'ADMIN' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terkini</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Budi Santoso</span> menyelesaikan tugas "Update website"
                </p>
                <p className="text-xs text-gray-500">2 menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Siti Nurhaliza</span> membuat proyek baru "Mobile App Development"
                </p>
                <p className="text-xs text-gray-500">15 menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Ahmad Fauzi</span> login ke sistem
                </p>
                <p className="text-xs text-gray-500">1 jam yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
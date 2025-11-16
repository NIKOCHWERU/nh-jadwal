import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Attendance() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [location, setLocation] = useState(null)
  const [checkInStatus, setCheckInStatus] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: null,
    checkOutTime: null
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCheckIn = async () => {
    // Placeholder implementation
    setCheckInStatus(prev => ({
      ...prev,
      checkedIn: true,
      checkInTime: new Date()
    }))
  }

  const handleCheckOut = async () => {
    // Placeholder implementation
    setCheckInStatus(prev => ({
      ...prev,
      checkedOut: true,
      checkOutTime: new Date()
    }))
  }

  const calculateWorkHours = () => {
    if (checkInStatus.checkInTime && checkInStatus.checkOutTime) {
      const diff = checkInStatus.checkOutTime - checkInStatus.checkInTime
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours} jam ${minutes} menit`
    }
    return '0 jam 0 menit'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Absensi</h1>
        <p className="text-gray-600">Pencatatan kehadiran karyawan</p>
      </div>

      {/* Time Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-4xl font-bold text-primary-500 mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-gray-600">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Check-in/Check-out Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Check In</h3>

            <div className="mb-4">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <span className="iconify text-3xl text-gray-400" data-icon="tabler:camera" />
              </div>
            </div>

            {location && (
              <div className="mb-4 text-sm text-gray-600">
                <span className="iconify mr-1" data-icon="tabler:map-pin" />
                Lokasi terdeteksi
              </div>
            )}

            {checkInStatus.checkInTime && (
              <div className="mb-4 p-3 bg-green-50 rounded-md">
                <p className="text-green-800 font-medium">
                  Check In: {formatTime(checkInStatus.checkInTime)}
                </p>
              </div>
            )}

            <button
              onClick={handleCheckIn}
              disabled={checkInStatus.checkedIn}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkInStatus.checkedIn ? 'Sudah Check In' : 'Check In'}
            </button>
          </div>
        </div>

        {/* Check-out Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Check Out</h3>

            <div className="mb-4">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <span className="iconify text-3xl text-gray-400" data-icon="tabler:camera" />
              </div>
            </div>

            {checkInStatus.checkedOutTime && (
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <p className="text-blue-800 font-medium">
                  Check Out: {formatTime(checkInStatus.checkedOutTime)}
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Jam kerja: {calculateWorkHours()}
                </p>
              </div>
            )}

            <button
              onClick={handleCheckOut}
              disabled={!checkInStatus.checkedIn || checkInStatus.checkedOut}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkInStatus.checkedOut ? 'Sudah Check Out' : 'Check Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Kehadiran</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jam Kerja
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  16 Januari 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  08:15:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  17:30:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Hadir
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  9 jam 15 menit
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  15 Januari 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  08:45:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  17:15:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Terlambat
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  8 jam 30 menit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
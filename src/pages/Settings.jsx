import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pengaturan</h1>
        <p className="text-gray-600">Pengaturan profil dan preferensi</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Profil</h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=A97C09&color=fff`}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4 className="font-medium text-gray-900">{user?.name}</h4>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-xs text-gray-400 uppercase">{user?.role}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-center text-gray-500 py-8">
              <span className="iconify text-4xl text-gray-300" data-icon="tabler:settings" />
              <p className="mt-4">Pengaturan lengkap akan segera tersedia</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
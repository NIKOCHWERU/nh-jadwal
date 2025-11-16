import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Header({ onMenuToggle, isMobile }) {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <span className="iconify text-xl" data-icon="tabler:menu-2" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">
          Selamat datang kembali, {user?.name || 'User'}!
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-gray-100 relative">
          <span className="iconify text-xl" data-icon="tabler:bell" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=A97C09&color=fff`}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Karyawan'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
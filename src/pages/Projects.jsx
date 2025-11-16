import React from 'react'

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Retainer/Proyek</h1>
        <p className="text-gray-600">Manajemen proyek dan klien retainer</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-center text-gray-500 py-12">
          <span className="iconify text-6xl text-gray-300" data-icon="tabler:building-community" />
          <p className="mt-4">Sistem proyek akan segera tersedia</p>
        </p>
      </div>
    </div>
  )
}
import React from 'react'

const DashBoard = () => {
  return (
    <div className="pt-20">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Total Assets</h2>
          <p className="text-2xl font-bold">$0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Total Liabilities</h2>
          <p className="text-2xl font-bold">$0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Net Worth</h2>
          <p className="text-2xl font-bold">$0</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
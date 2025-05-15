"use client"
import { PieChart } from '@/components/Charts/Barchart'
import Dashboard from '@/components/Dashboard/Dashboard'
import React, { useEffect, useState } from 'react'
interface DashboardData {
  products: number;
  brands: number;
  orders: number;
  customize: number;
  customizeOrders: number;
}

const page = () => {
  const [dashboardData ,setDashboardData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (data.success) {
          setDashboardData(data.data)
        } else {
          setError(data.message || 'Something went wrong')
        }
      } catch (err: any) {
        setError(err.message || 'Fetch failed')
      }
    }

    fetchData()
  }, [])

  return (
    <div className='w-full'>
      <div>
        {dashboardData ? (
          <Dashboard data={dashboardData} />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <PieChart />
      </div>
    </div>
  )
}

export default page




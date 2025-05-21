"use client"
import AreaChartComponent from '@/components/Charts/Barchart';
import Dashboard from '@/components/Dashboard/Dashboard'
import React, { useEffect, useState } from 'react'

interface DashboardData {
  products: number;
  brands: number;
  orders: number;
  customize: number;
  customizeOrders: number;
}

interface ChartEntry {
  month: string;
  normalOrders: number;
  customizedOrders: number;
}

const Page = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // For dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, [])

  // For chart data
  useEffect(() => {
    const getTotalOrdersComparison = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/get-total-oders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (data.success) {
          setChartData(data.data)
        } else {
          setError(data.message || 'Something went wrong')
        }
      } catch (error: any) {
        setError(error.message || 'Fetch failed')
      } finally {
        setLoading(false);
      }
    }
    
    getTotalOrdersComparison()
  }, [])

  // Fallback data if API fails
  useEffect(() => {
    if (error && chartData.length === 0) {
      // Sample data in case API fails
      const fallbackData = [
        { month: "January", normalOrders: 30, customizedOrders: 15 },
        { month: "February", normalOrders: 40, customizedOrders: 20 },
        { month: "March", normalOrders: 45, customizedOrders: 25 },
        { month: "April", normalOrders: 50, customizedOrders: 30 },
        { month: "May", normalOrders: 35, customizedOrders: 40 },
        { month: "June", normalOrders: 25, customizedOrders: 45 }
      ];
      setChartData(fallbackData);
    }
  }, [error, chartData]);

  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <div className="mb-8">
        {dashboardData ? (
          <Dashboard data={dashboardData} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error loading dashboard data</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        )}
      </div>
      
      <div className="w-full mx-auto">
        {chartData && chartData.length > 0 ? (
          <AreaChartComponent data={chartData} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error loading chart data</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page



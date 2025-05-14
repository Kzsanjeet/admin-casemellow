import { PieChart } from '@/components/Charts/Barchart'
import Dashboard from '@/components/Dashboard/Dashboard'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <div>
         <Dashboard/>
      </div>
      <div>
          <PieChart/>
      </div>
    </div>
  )
}

export default page



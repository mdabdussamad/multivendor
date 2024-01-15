import React from 'react'
import WeeklySalesChart from './WeeklySalesChart'
import BestSallingProductsChart from './BestSallingProductsChart'

export default function DashboardCharts() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <WeeklySalesChart />
        <BestSallingProductsChart />
    </div>
  )
}

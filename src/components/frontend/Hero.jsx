'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroCarousel from '@/components/frontend/HeroCarousel'
import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react'
import advert from '../../../public/adv.gif'

export default function Hero() {
  const categories=[{}, {}, {}, {}, {}, {}, {}, {}]
  return (
    <div className='grid grid-cols-12 gap-8 mb-6'>
      <div className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden">
        <h2 className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100">
          Shope By Category
        </h2>
        <div className="py-3 px-6 h-[300px] overflow-y-auto flex flex-col gap-2">
         {
          categories.map((category, i)=>{ 
            return(
              <Link key={i}
              href="#" 
              className='flex items-center gap-3 hover:bg-slate-50 duration-300 transition-all dark:text-slate-300 dark:hover:bg-slate-600 rounded-md'
              >
              <Image 
              width={556} 
              height={556} 
              className='w-10 h-10 rounded-full object-cover border border-lime-300' 
              src="/vegitables.webp" 
              alt='Fruits' 
              />
              <span className='text-sm'>Vegitables</span>
            </Link>
            );
          })}                
        </div>
      </div>
      <div className="col-span-full sm:col-span-7 bg-blue-600 rounded-md">
        <HeroCarousel />
      </div>
      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg">
        <Link href='#' className="flex items-center space-x-1 mb-3">
          <HelpCircle className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />
          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Help Center</h2>
            <p className='text-[0.6rem]'>Guide to Customer Care</p>
          </div>
        </Link>
        <Link href='#' className="flex items-center space-x-1 mb-3">
          <FolderSync className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />
          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Easy Return</h2>
            <p className='text-[0.6rem]'>Quick Return</p>
          </div>
        </Link>
        <Link href='/register-farmer' className="flex items-center space-x-1 mb-6">
          <CircleDollarSign className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />
          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Sell on Hygienic</h2>
            <p className='text-[0.6rem]'>Million of Visitors</p>
          </div>
        </Link>

        <Image src={advert} alt='advert' className='w-full rounded-lg' />
      </div>     
    </div>
  )
}

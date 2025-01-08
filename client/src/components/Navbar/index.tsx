import React from 'react'
import { Search, Settings } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'> 
        {/* Search bar */}
        <div className='flex items-center gap-8'>
          <div className='relative flex h-min w-[200px]'>
            <Search className='absolute left-[4px] top-1/2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
            <input className='w-full rounded border-none bg-gray-200 p-2 pl-8 placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white' type='search' placeholder='Search..' ></input>
          </div>
        </div>

        {/* Icon */}
        <div className='flex items-center '>
          <Link href="/setting" className='h-min w-min rounded-full p-2 hover:bg-gray-200'>
            <Settings className='size-6 cursor-pointer dark:text-white'/>
          </Link>
          <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-300 md:inline-block'/>
        </div>

    </div>
  )
}

export default Navbar
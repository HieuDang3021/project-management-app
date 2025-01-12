import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSideBarOpen } from '@/state'

const Navbar = () => {
  const dispatch = useAppDispatch();
  
  const isSideBarOpen = useAppSelector((state) => state.global.isSideBarOpen);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'> 
        {/* menu button */}
        <div className='flex items-center gap-8'>
          { !isSideBarOpen && 
            <button onClick={() => dispatch(setIsSideBarOpen(!isSideBarOpen))}>
              <Menu className='size-8 cursor-pointer dark:text-white'/>
            </button>
          }
        {/* Search bar */}
          <div className='relative flex h-min w-[200px]'>
            <Search className='absolute left-[4px] top-1/2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
            <input className='w-full rounded border-none bg-gray-200 p-2 pl-8 placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white' type='search' placeholder='Search..' ></input>
          </div>
        </div>

        {/* Icon */}
        <div className='flex items-center '>
          <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))} 
            className={`${isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-200'} rounded p-2 dark:active:bg-yellow-100 active:bg-blue-300`}>
              { isDarkMode ?
                <Sun className='size-6 cursor-pointer dark:text-white dark:active:text-yellow-500'/>
                : <Moon className='size-6 cursor-pointer active:text-blue-600'/>
              }
            </button>
          <Link href="/setting" className='h-min w-min rounded-full p-2 hover:bg-gray-200 pointer-events-nsone'> {/* remove pointer-events-none when work*/}
            <Settings className='size-6 cursor-pointer dark:text-white'/>
          </Link>
          <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-300 md:inline-block'/>
        </div>

    </div>
  )
}

export default Navbar
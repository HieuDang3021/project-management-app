'use client'
import { Home, LockIcon, LucideIcon, X } from 'lucide-react';
import React from 'react'

import Logo from '@/assets/icons/logo.svg'
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Link from 'next/link';
import { setIsSideBarOpen } from '@/state';

const Sidebar = () => {
  // const [showProjects, setShowProjects] = useState(true);
  // const [showPriority, setShowPriority] = useState(true);

  
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.global.isSideBarOpen);

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 z-30 bg-white dark:bg-black dark:text-white overflow-y-auto w-64 ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <div className={sidebarClassNames}>
      <div className='flex h-[100%] w-full flex-col justify-start'>
        {/* TOP TITLE */}
        <div className='z-50 flex  min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
          <div className='text-xl font-bold text-gray-800 dark:text-white'>
            Projects
          </div>
          {isSideBarOpen && 
            <button onClick={() => dispatch(setIsSideBarOpen(!isSideBarOpen))}>
              <X className='size-6 cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white'/>
            </button>
          }
        </div>
        {/* TEAM */}
        <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
          <Logo className='size-10'/>
          <div>
            <h3 className='text-base font-bold tracking-wide dark:text-gray-200'>
              MY TEAM
            </h3>
            <div className='mt-1 flex items-start gap-2'>
              <LockIcon className='size-3 dark:text-gray-400 mt-[0.1rem] text-gray-500'/>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className='z-10 w-full'>
          <SidebarLink href='/' icon={Home} lable='Home'/>
        </nav>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  lable: string;
  // isOpen: boolean;
};

const SidebarLink = ({ 
  href, 
  icon: Icon, 
  lable, 
  // isOpen
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard');
  // const screenWidth = window.innerWidth;

  // const dispatch = useAppDispatch();
  
  // const isSideBarOpen = useAppSelector((state) => state.global.isSideBarOpen);
  
  return (
    <Link href={href} className='w-full'>
      <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''}`}>
        { isActive && <div className='absolute left-0 top-0 w-[5px] h-full bg-blue-200'/> }
        <Icon className='size-6 text-gray-800 dark:text-gray-100'/>
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>{lable}</span>
      </div>
    </Link>
  )
}

export default Sidebar
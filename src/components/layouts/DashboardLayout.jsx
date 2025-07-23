import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Navbar } from './Navbar'
import { SideMenu } from './SideMenu'

export const DashboardLayout = ({children, activeMenu}) => {
  const { user } = useContext(UserContext); 
  return (
    <div className=''>
        <Navbar activeMenu = {activeMenu}/>
        {user && (
            <div className='flex min-h-[calc(100vh-61px)]'>
                <div className='hidden lg:block w-64 bg-gray-100 border-r border-gray-200'>
                    <SideMenu activeMenu = {activeMenu}/>
                </div>

                <div className='flex-1 p-4 overflow-auto'>{children} </div>
            </div>
        )}
    </div>
  );
};

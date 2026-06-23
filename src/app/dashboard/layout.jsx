// components/DashboardLayout.js
import { DashboardSidebar } from '@/dashboardComponents/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex min-h-screen'>
            <div className="hidden lg:block w-64 border-r border-default">
                <DashboardSidebar />
            </div>
            <div className='flex-1 p-4 lg:p-10'>
                <div className="lg:hidden mb-4">
                    <DashboardSidebar />
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
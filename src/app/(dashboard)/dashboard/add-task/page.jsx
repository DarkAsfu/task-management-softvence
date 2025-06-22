import AddTask from '@/app/modules/Dashboard/AddTask';
import Navbar from '@/app/modules/Dashboard/Navbar';
import SectionBanner from '@/app/modules/Reusable/SectionBanner';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar/>
            <SectionBanner/>
            <AddTask/>
        </div>
    );
};

export default page;
import Banner from '@/app/modules/Dashboard/Banner';
import EditTask from '@/app/modules/Dashboard/EditTask';
import Navbar from '@/app/modules/Dashboard/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <EditTask/>
        </div>
    );
};

export default page;
import Banner from '@/app/modules/Dashboard/Banner';
import Navbar from '@/app/modules/Dashboard/Navbar';
import TaskList from '@/app/modules/Dashboard/TaskList';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <TaskList/>
        </div>
    );
};

export default page;
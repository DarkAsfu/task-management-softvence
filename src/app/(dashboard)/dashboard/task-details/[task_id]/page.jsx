'use client'

import Navbar from '@/app/modules/Dashboard/Navbar';
import TaskDetails from '@/app/modules/Dashboard/TaskDetails';
import SectionBanner from '@/app/modules/Reusable/SectionBanner';
import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {
    const params = useParams();
    return (
        <div>
            <Navbar/>
            <SectionBanner/>
            {/* {params.task_id} */}
            <TaskDetails/>
        </div>
    );
};

export default page;
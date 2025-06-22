import Banner from '@/app/modules/Dashboard/Banner';
import Navbar from '@/app/modules/Dashboard/Navbar';
import SpinWheel from '@/app/modules/Dashboard/SpinWheel';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <SpinWheel/>
        </div>
    );
};

export default page;
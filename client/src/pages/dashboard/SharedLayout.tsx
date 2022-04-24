import React from 'react'
import Wrapper from '../../styles/SharedLayout.style';
import { Outlet } from 'react-router-dom';
import SmallSidebar from '../../components/SmallSidebar';
import BigSideBar from '../../components/BigSideBar';
import Navbar from '../../components/Navbar';

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className='dashboard' >
                <SmallSidebar />
                <BigSideBar />
                <div >
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default SharedLayout
import React from 'react'
import Wrapper from '../../styles/SharedLayout.style';
import { Outlet, Link } from 'react-router-dom';

const SharedLayout = () => {
    return (
        <Wrapper>
            <nav>
                <Link to="add-job">Add Job</Link>
                <Link to="all-jobs">All Jobs</Link>
            </nav>
            <Outlet/>
        </Wrapper>
    )
}

export default SharedLayout
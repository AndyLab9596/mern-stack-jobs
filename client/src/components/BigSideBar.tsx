import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../styles/BigSideBar'
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSideBar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
import React, { useState } from 'react'
import Wrapper from '../styles/Navbar.style'
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type='button' className='toggle-btn' onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text' >
            Dashboard
          </h3>
        </div>
        <div className="btn-container">
          <button type='button' className='btn' onClick={() => setShowLogout(prevState => !prevState)} >
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={() => logoutUser()}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
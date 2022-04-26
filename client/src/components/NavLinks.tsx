import React from 'react';
import { NavLink } from 'react-router-dom';
import links from './links';

interface NavLinksProps {
    toggleSidebar?: () => void
}

const NavLinks: React.FC<NavLinksProps> = ({ toggleSidebar }) => {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { text, path, id, icon } = link;
                return (
                    <NavLink
                        key={id}
                        to={path}
                        onClick={toggleSidebar}
                        className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                    >
                        <span className='icon' >
                            {icon}
                        </span>
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavLinks
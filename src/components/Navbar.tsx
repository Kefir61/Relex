import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
const Navbar:React.FC = () => {
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(location.pathname)
  },[location])

  const classNameLink = (str:string) => {
    return  `${activeLink === str ? 'active--link' : ''}`
  }
  
  return (
    <nav className='navbar'>
        <ul>
            <li><NavLink to='/admin' 
                onClick={() => setActiveLink('/admin')} 
                className={`navbar--link__application ${classNameLink('/admin')}`}>Заявки</NavLink>
            </li>
            <li>
                <NavLink to='/archive' 
                onClick={() => setActiveLink('/archive')} 
                className={`navbar--link__archive ${classNameLink('/archive')}`}>Архив</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
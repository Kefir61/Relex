import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import doctorBag from '../assets/icons/doctor-bag.svg'
import admin from '../assets/icons/admin.svg'
import { useAuth } from 'hooks/use-auth'
import arrow from '../assets/icons/arrow_right.svg'
import { removeUser } from 'redux/slices/userSlice'
import { useDispatch } from 'react-redux'
const Header:React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logOut, setLogOut] = useState(false)
  const {email, isAuth} = useAuth()
  const onClickLogOut = () => {
    dispatch(removeUser())
    navigate('/login')
  }
  return (
    <header className='header'>
        <Link to='/' className='header--logo'><img src={doctorBag}/></Link>
        {isAuth && 
          <div className='header--login'>
            <div className='header--login__title' onClick={() => setLogOut(!logOut)}>{email}</div>
            <div onClick={() => setLogOut(!logOut)} className={logOut ? 'header--login__arrowButton' : 'header--login__arrowTop'}><img src={arrow} alt=""/></div>
            {logOut &&
              <div className='header--login__logout'><span onClick={() => onClickLogOut()}>Выйти</span></div>
            }
          </div>}
        <div className='header--account'><img src={admin}/></div>
    </header>
  )
}

export default Header
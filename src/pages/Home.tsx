import React from 'react'
import user from '../assets/icons/user.svg'
import admin from '../assets/icons/admin.svg'
import { Link } from 'react-router-dom'
import { useAuth } from 'hooks/use-auth'
const Home:React.FC = () => {
  const{isAuth} = useAuth()
  return (
    <div className="wrapper">
      <div className="app">
        <h2 className='app--title'>Войти в систему как</h2>
        <div className='app--menu'>
          <div className='app--menu__user'>
            <Link to='/user'><img src={user}/></Link>
            <h3>Пользователь</h3>
          </div>
          <div className='app--menu__admin'>
            <Link to={isAuth ? '/admin' : '/login'}><img src={admin}/></Link>
            <h3>Администратор</h3>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Home
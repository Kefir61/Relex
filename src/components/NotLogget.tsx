import React from 'react'
import { Link } from 'react-router-dom'

const NotLogget:React.FC = () => {
  return (
    <div className='notLogget'>
        <span>К сожалению вы не авторизованы</span>
        <span>Вы можете оставить заявку на прием к врачу или зайти как администратор</span>
        <div className='notLogget--links'>
            <Link to='/user' className='notLogget--links__item links--item__user'>Оставить заявку</Link>
            <Link to='/login' className='notLogget--links__item links--item__admin'>Зайти как администратор</Link>
        </div>
    </div>
  )
}

export default NotLogget
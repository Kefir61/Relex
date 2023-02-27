import NotLogget from 'components/NotLogget'
import { useAuth } from 'hooks/use-auth'
import {  useDispatch, useSelector } from 'react-redux'
import Application from '../components/Application/ApplicationItem'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { selectRecord } from '../redux/slices/recordSlice'
import React, { useEffect, useRef } from 'react'
import { getRecord } from 'api'
import { useAppDispatch } from 'redux/store'

const Admin:React.FC = () => {
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)
  const {items} =useSelector(selectRecord)
  const {isAuth, id, email} = useAuth();

  useEffect(() => {
    dispatch(getRecord())
  },[])
  
  useEffect(() => {
    if(isMounted.current){
      const json = JSON.stringify({id, email})
      localStorage.setItem('user', json)
    }
    isMounted.current = true
  },[isAuth])

  return isAuth ? (
    <div className='wrapper--admin'>
      <Header/>
      <Navbar/>
      <main className='admin'>
        {items.map((item,index) => <Application key={index} {...item}/>)}
      </main>
    </div>
  ) : <NotLogget/>
}

export default Admin
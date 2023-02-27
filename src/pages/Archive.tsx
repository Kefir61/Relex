import NotLogget from 'components/NotLogget'
import { useAuth } from 'hooks/use-auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { getRecord, getRecordArchive } from '../api'
import ApplicationItem from '../components/Application/ApplicationItem'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { selectArchiveRecord } from '../redux/slices/archiveRecordSlice'
function Archive() {
  const dispatch = useAppDispatch()
  const {items} =useSelector(selectArchiveRecord)
  useEffect(() => {
    dispatch(getRecordArchive())
  
  },[])
  const {isAuth} = useAuth()
  return isAuth ? (
    <div className='wrapper--admin'>
    <Header/>
    <Navbar/>
    <main className='admin'>
      {items.map((item,index) => <ApplicationItem key={index} {...item}/>)}
    </main>
  </div>
  ) : <NotLogget/>
}

export default Archive
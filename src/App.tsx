import React from 'react';
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Archive from './pages/Archive';
import Card from './components/Application/Card';
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { getRecord, getRecordArchive } from './api';
import ArchiveCard from './components/Application/ArchiveCard';
import { useAuth } from 'hooks/use-auth';
import { useAppDispatch } from 'redux/store';
function App() {
const dispatch = useAppDispatch()
useEffect(() => {
  dispatch(getRecord())
  dispatch(getRecordArchive())

},[])
const {isAuth} = useAuth()
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={ <Admin />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/admin/card/:id" element={<Card />} />
        <Route path="/admin/card-archive/:id" element={<ArchiveCard />} />
      </Routes>
    
  );
}

export default App;

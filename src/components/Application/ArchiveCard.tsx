import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import { selectArchiveRecordById } from '../../redux/slices/archiveRecordSlice'
const ArchiveCard:React.FC = () => {
    const params = useParams()
    const item = useSelector(selectArchiveRecordById(String(params.id)))

  return (
    <div className='wrapper--admin'>
      <Header/>
      <Navbar/>
      <main className='admin'>
        <h2>{item && (item.complaintTextArea ? item.complaintTextArea : item.complaints)}</h2>
        <div className="admin--panel">
          <h3 className='admin--panel__title'>{item?.firstName} {item?.lastName}</h3>
          <div className='admin--panel__date'>{item?.recordingDate}</div>
          <div 
                  className={`panel--status ${String(item?.status) === 'cancel' ? 'panel--status__cancel' : 'panel--status__confirm'}`}>
                  {String(item?.status) === 'cancel' ? 'Отказано' : 'Принято'}
          </div>
        </div>
        <div className='admin--block'>
          <h3 className='admin--block__paragraph'>Симптомы</h3>
          <span className='explanations'>(Шкала от 0 до 10, где 0 - не беспокоит, 10 - беспокоит очень сильно)</span> 
        </div> 
        <div className='admin--symptoms'>
          {item?.symptoms.map((obj) => {
            return (
            <div className='admin--symptoms__item' key={obj.id}>
              <span className='item--symptoms__name'>{obj.name}:</span>
              <div>{obj.mark+1}</div>
            </div>
          )})}
        </div>

        <h3 className='admin--paragraph'>Контактная информация</h3>
        <div className="admin--contacts">
          <div>Номер телефона: {item?.phoneNumber}</div>
          {item?.email && <div>Email: {item?.email}</div>}
        </div>
        <h3 className='admin--paragraph'>Желаемая дата приема:{item?.desiredDate}</h3>
        <Link to='/admin' className='admin--back'>Вернуться</Link>
      </main>
    </div>
  )
}

export default ArchiveCard
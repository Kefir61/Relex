import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { minusRecord, RecordItemType, selectRecordById } from '../../redux/slices/recordSlice'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import {ReactComponent as Confirm} from '../../assets/icons/confirm.svg'
import {ReactComponent as Cancel} from '../../assets/icons/cancel.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecord, postRecordArchive } from '../../api'
const Card:React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const item = useSelector(selectRecordById(String(params.id)))

  const onChangeStatus = async (status:string) => {
    const conf = window.confirm('Вы действительно хотите изменить статус заявки?')
    if(conf){
      const newItem = {
        lastName:item?.lastName,
        firstName: item?.firstName,
        phoneNumber: item?.phoneNumber,
        email: item?.email,
        complaints: item?.complaints,
        complaintTextArea: item?.complaintTextArea,
        desiredDate: item?.desiredDate,
        recordingDate: item?.recordingDate,
        symptoms: item?.symptoms,
        status: status
      }

      //@ts-ignore
      await dispatch(postRecordArchive(newItem)).then(
      //@ts-ignore
        dispatch(deleteRecord(params.id))
      ).then(dispatch(minusRecord(params.id)))
    }
    navigate('/admin')
}

  return (
    <div className='wrapper--admin'>
      <Header/>
      <Navbar/>
      <main className='admin'>
        <h2>{item && (item.complaintTextArea ? item.complaintTextArea : item.complaints)}</h2>
        <div className="admin--panel">
          <h3 className='admin--panel__title'>{item?.firstName} {item?.lastName}</h3>
          <div className='admin--panel__date'>{item?.recordingDate}</div>
          <div className='admin--panel__button admin--panel__confirm' onClick={() => onChangeStatus('confirm')}><Confirm/></div>
          <div className='admin--panel__button admin--panel__cancel' onClick={() => onChangeStatus('cancel')}><Cancel/></div>
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

export default Card
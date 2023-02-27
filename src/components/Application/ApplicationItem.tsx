import React from 'react'
import {ReactComponent as Confirm} from '../../assets/icons/confirm.svg'
import {ReactComponent as Cancel} from '../../assets/icons/cancel.svg'
import {minusRecord, RecordItemType} from '../../redux/slices/recordSlice'
import { Link } from 'react-router-dom'
import { deleteRecord, postRecordArchive } from '../../api'
import { useDispatch } from 'react-redux'


const ApplicationItem:React.FC<RecordItemType> = ({lastName, recordingDate,complaints,complaintTextArea, id, firstName, phoneNumber, email, desiredDate, symptoms, status}) => {
  const dispatch = useDispatch()

  const onChangeStatus = async (status:string) => {
    const conf = window.confirm('Вы действительно хотите изменить статус заявки?')
      if(conf){
        const item = {
          lastName,
          firstName,
          phoneNumber,
          email,
          complaints,
          complaintTextArea,
          desiredDate,
          recordingDate,
          symptoms,
          status: status
        }
    
        //@ts-ignore
        await dispatch(postRecordArchive(item)).then(
        //@ts-ignore
        dispatch(deleteRecord(id))
        ).then(dispatch(minusRecord(id)))   
      }   
  }
  return (
    <>
      <div className='wrapper--application'>
        <Link to={String(status) === 'processing' ? `/admin/card/${id}` : `/admin/card-archive/${id}`} className='application'>
            <h3 className='application--title'>{lastName}</h3>
            <p className='application--complaint'>{complaintTextArea ? complaintTextArea : complaints}</p>
            <div className='application--date'>{recordingDate}</div>
        </Link>
        {
              String(status) === 'processing' ? 
                <>
                  <div className='application--confirm application--status' onClick={() => onChangeStatus('confirm')}><Confirm/></div>
                  <div className='application--cancel application--status'><Cancel onClick={() => onChangeStatus('cancel')}/></div>
                </>
                :
                  <span 
                    className={`${String(status) === 'cancel' ? 'status--cancel' : 'status--confirm'}`}>
                    {String(status) === 'cancel' ? 'Отказано' : 'Принято'}
                  </span>
        }
      </div>
    </>
  )
}
export default ApplicationItem
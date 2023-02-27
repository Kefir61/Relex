import { useDispatch, useSelector } from 'react-redux'
import Symptoms from '../components/Symptoms'
import { useInput } from '../hooks/use-input'
import { selectSymptom, updateSymptoms } from '../redux/slices/symptomSlice'
import { postRecord } from '../api'
import Header from 'components/Header'
const User:React.FC = () => {
  const dispatch = useDispatch()


  const lastName = useInput('',{isEmty:true, isName:true})
  const firstName = useInput('',{isEmty:true, isName:true})
  const phoneNumber = useInput('',{isEmpty:true, isPhoneNumber:true})
  const email = useInput('',{isEmail:true})
  const complaints = useInput('',{})
  const complaintTextArea = useInput('',{})
  const desiredDate = useInput('',{})

  const date = new Date()
  const recordingDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

  const {symptoms} = useSelector(selectSymptom)

  const disabledButton = () => {
    if(desiredDate.value==='' 
    || firstName.nameError 
    || lastName.nameError 
    || phoneNumber.value ===''
    || complaints.value === ''
    || (complaints.value === 'Свой вариант' && complaintTextArea.value==='')){
      return true
    }
    else{
      return false
    }
  }

  const updateForm = () => {
    lastName.resetValue()
    firstName.resetValue()
    phoneNumber.resetValue()
    email.resetValue()
    complaints.resetValue()
    complaintTextArea.resetValue()
    desiredDate.resetValue()
    dispatch(updateSymptoms())
  }

  const onClickSend = async () => {
    const item = {
      lastName: lastName.value,
      firstName: firstName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      complaints: complaints.value,
      complaintTextArea: complaintTextArea.value,
      desiredDate: desiredDate.value,
      recordingDate: recordingDate,
      symptoms:symptoms,
      status: 'processing'
    }
    //@ts-ignore
    dispatch(postRecord(item))
    updateForm()

  }

  return (
    <>
      <Header/>
      <div className='user'>
          <h1>Запись на приём к врачу</h1>
          <form>
              <div className="user--datails">
                <h2>Персональные данные пациента</h2>
                <label>Фамилия</label>
                <input required={true} placeholder='Ермаков'value={lastName.value} onChange={(e) => lastName.onChange(e)} onBlur={e => lastName.onBlure(e)}/>    
                {/* {(lastName.isDirty && lastName.nameError) && <div className='input--error'>Некорректная фамилия</div>} */}

                <label>Имя</label>
                <input required={true} placeholder='Егор' value={firstName.value} onChange={(e) => firstName.onChange(e)} onBlur={e => firstName.onBlure(e)}/>
                {/* {(firstName.isDirty && firstName.nameError) && <div className='input--error'>Некорректное имя</div>} */}
                
                <label>Номер телефона</label>
                <input required={true} placeholder='89623292582' value={phoneNumber.value} onChange={(e) => phoneNumber.onChange(e)} onBlur={e => phoneNumber.onBlure(e)}/>
                {/* {(phoneNumber.isDirty && phoneNumber.phoneNumber) && <div className='input--error'>Некорректный телефон</div>} */}

                <label>Почта</label>
                <input placeholder='yegor.yermakov.2001@mail.ru' type='email' value={email.value} onChange={(e) => email.onChange(e)} onBlur={e => email.onBlure(e)}/>
              </div>
              
              
              <div className="user--complaints">
                <h2>Жалобы</h2>
                <select value={complaints.value} onChange={(e) => complaints.onChange(e)} onBlur={e => complaints.onBlure(e)}>
                    <option>Выберите жалобу</option>
                    <option>Плохое самочувствие</option>
                    <option>Боль в спине</option>
                    <option>Боль головы</option>
                    <option>Плановое обследование</option>
                    <option>Свой вариант</option>
                </select>
                {complaints.value === 'Свой вариант' ? <textarea placeholder='Свой вариант'value={complaintTextArea.value} onChange={(e) => complaintTextArea.onChange(e)} onBlur={e => complaintTextArea.onBlure(e)}/> : ''} 
              </div>
              
              <div className="symptoms--title">
                <h2>Симптомы</h2>
                <span className='symptoms--title__explanations'>(Шкала от 0 до 10 сердечек, где 0 - не беспокоит, 10 - беспокоит очень сильно)</span>
              </div>
              <Symptoms/>
              
              <div className="user--date">
                <h2>Желаемая дата посещения</h2> 
                <input 
                type="date" 
                name="calendar" 
                required={true} 
                value={desiredDate.value} 
                onChange={(e) => desiredDate.onChange(e)} 
                onBlur={e => desiredDate.onBlure(e)}></input>
              </div>
                   

              
              <input 
              disabled={disabledButton()} 
              type='button' 
              onClick={() => onClickSend()} value='отправить' 
              className={disabledButton() ? '' : 'user--button'}/>
          </form>
      </div>
    </>
  )
}

export default User
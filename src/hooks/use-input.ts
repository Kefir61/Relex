import React, { useEffect, useState } from 'react'


export const useInput = (initialValue: string, validations: object) => {
     const [value, setValue] = useState(initialValue)
     const [isDirty, setDirty] = useState(false)
     const valid = useValidation(value, validations)
     
     const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          setValue(e.target.value)
     }

     const onBlure = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          setDirty(true)
     }
     const resetValue = () => {
          setValue('')
     }

     return {
          value,
          onChange,
          onBlure,
          ...valid,
          isDirty,
          resetValue
     }
}

export const useValidation = (value: string, validations: any) => {
     const [isEmpty, setEmpty] = useState(true)
     const [emailError, setEmailError] = useState(true)
     const [nameError, setNameError] = useState(true)
     const [phoneNumber, setPhoneNumber] = useState(true)
     const [inputValid, setInputValid] = useState(true)
     useEffect(() => {
          for (const validation in validations) {
               switch (validation) {
                    case 'isEmpty':
                         value ? setEmpty(false) : setEmpty(true)
                         break;
                    case 'isEmail':
                         const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                         re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                         break;
                    case 'isName':
                         const result = /^[A-Za-zА-Яа-яёЁ]+(?:[-'\s][A-Za-zА-Яа-яёЁ]+)*$/
                         result.test(String(value).toLowerCase()) ? setNameError(false) : setNameError(true)
                         break;
                    case 'isPhoneNumber':
                         const res = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
                         res.test(String(value).toLowerCase()) ? setPhoneNumber(false) : setPhoneNumber(true)
                         break;
               }
          }
     }, [value])

     useEffect(() => {
          if (isEmpty || emailError || nameError) {
               setInputValid(false)
          }
          else {
               setInputValid(true)
          }
     }, [isEmpty, emailError, nameError, phoneNumber])
     return {
          isEmpty,
          emailError,
          inputValid,
          nameError,
          phoneNumber
     }
}
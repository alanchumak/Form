import React, { useState } from 'react'
import { TextInput } from "./Inputs/TextInput" // место для реэкспорта
import { PhoneInput } from './Inputs/PhoneInput';
import { DropDown } from './DropDown/DropDown';
import { ExtraFieldsButton } from './ExtraFieldsButton';
import { StyledForm } from './StyledForm';
import { SendButton } from './SendButton/SendButton';
import { Section4FormField } from './Wrappers/Section4FormField';
// import styles from './MyInput.module.css';

import { useDispatch, useSelector } from 'react-redux'
import { printFormData, formCleaned, selectField } from './formSlice'

import { cities } from './DropDown/cities'
import { sources } from './DropDown/sources'

const useNameIsWrong = value => value.length < 2
const phoneIsWrong = value => value.includes('_')
const emailIsWrong = value => !(/.+@.+\..+/.test(value))
const profileIsWrong = value => value.length < 3


export const Form = () => {
    const [isExtraFieldsShowed, setExtraFieldsShowed] = useState(false)
    const showExtraFields = () => setExtraFieldsShowed(prevValue => !prevValue)
        
    const dispatch = useDispatch()

    const userName = useSelector(state => selectField(state, 'userName'))
    const userPhone = useSelector(state => selectField(state, 'userPhone'))
    const email = useSelector(state => selectField(state, 'email'))
    const profile = useSelector(state => selectField(state, 'profile'))
    const city = useSelector(state => selectField(state, 'city'))

    const canSend = ([
        !useNameIsWrong(userName),
        !phoneIsWrong(userPhone),
        !emailIsWrong(email),
        !profileIsWrong(profile),
        city
    ].every(Boolean)) 


    const [sendRequestStatus, setSendRequestStatus] = useState('idle')

    const onSent = async () => {
        // if (!canSave) return
        try {
            setSendRequestStatus('pending')
            const promise = new Promise((resolve, reject) => { 
                setTimeout(
                    () => {
                        dispatch(printFormData())
                        resolve(1)
                    },
                    2000)
            })
            await promise
            dispatch(formCleaned())
        } catch (err) {
            console.error('Failed to send the form: ', err)
        } finally {
            setSendRequestStatus('idle')
            // dispatch(formCleaned())

        }
    }

    return(
        <StyledForm>
            <section>
                <Section4FormField>
                    <TextInput 
                        id='userName' 
                        title='Ваше имя *' 
                        placeholder="Иван" 
                        isWrong={useNameIsWrong} 
                    />
                    <PhoneInput 
                        title='Номер телефона *'
                        id='userPhone'
                        placeholder='+7 (000) 000-00-00'
                        isWrong={phoneIsWrong}
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        // type="tel"
                    />
                    <TextInput 
                        id='email' 
                        title='E-mail *' 
                        placeholder="example@gmail.ru" 
                        isWrong={emailIsWrong} 
                    />
                    <TextInput 
                        id='profile' 
                        title='Ссылка на профиль *' 
                        placeholder="instagram.com/smth..." 
                        isWrong={profileIsWrong} 
                    />
                </Section4FormField>
            </section>
                 <DropDown 
                     id='city' 
                     title='Выберите город *' 
                     isRequired
                    options={cities}
                 />
            <TextInput
                     id='orgName'
                     title='Название организации/студии'
                     placeholder="Smth Company"
                 />
            <ExtraFieldsButton
                 isShowed={isExtraFieldsShowed}
                 onClick={showExtraFields}
             />

                     { isExtraFieldsShowed &&
                 <section>
                    <TextInput
                         id='recipient'
                         title='Получатель'
                         placeholder="ФИО"
                     />
                     <DropDown
                         id='sourse'
                         title='Откуда узнали про нас?'
                        options={sources}
                     />
                  </section>
             }
            <SendButton 
                disabled={!canSend} 
                onClick={onSent} 
                isPending={sendRequestStatus == 'pending'}/>
        </StyledForm>
    )
}

import React, { useState } from 'react'
import { Input } from "./Inputs/Input"
import { PhoneInput } from './PhoneInput/PhoneInput';
import { DropDown } from './DropDown';
import { ExtraFieldsButton } from '../ExtraFieldsButton';
import { SendButton } from './SendButton';
import styles from './MyInput.module.css';

import { useDispatch, useSelector } from 'react-redux'
import { printFormData, formCleaned, selectField } from '../formSlice'

const cities = [
    { value: 'MOW', label: 'Москва' },
    { value: 'SPB', label: 'Санкт-Петербург' },
    { value: 'KZN', label: 'Казань' },
    { value: 'KDA', label: 'Краснодар' },
];

const sources = [
    { value: '1', label: 'Инстаграм' },
    { value: '2', label: 'От друзей' },
    { value: '3', label: 'Реклама' },
    { value: '4', label: 'Поисковые системы' },
    { value: '5', label: 'Другое' },
];

const useNameIsWrong = value => value.length < 2
const phoneInputIsWrong = value => value.includes('_')
const emailIsWrong = value => !(/.+@.+\..+/.test(value))
const profileIsWrong = value => value.length < 3


export const Form = () => {
    const [isExtraFieldsShowed, setExtraFieldsShowed] = useState(false)
    const showExtraFields = () => setExtraFieldsShowed(prevCount => !prevCount)
        
    const dispatch = useDispatch()


    const userName = useSelector(state => selectField(state, 'userName'))
    const userPhone = useSelector(state => selectField(state, 'userPhone'))
    const email = useSelector(state => selectField(state, 'email'))
    const profile = useSelector(state => selectField(state, 'profile'))
    const city = useSelector(state => selectField(state, 'city'))

    const canSend = ([
        !useNameIsWrong(userName),
        !phoneInputIsWrong(userPhone),
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
        }
    }

    return(
        <form className={styles.myform}>
            <section>
                <div className={styles.formRow}>
                    <Input 
                        id='userName' 
                        title='Ваше имя *' 
                        placeholder="Иван" 
                        isWrong={useNameIsWrong} 
                        isRequired 
                    />
                    <PhoneInput 
                        id='userPhone' 
                        isWrong={phoneInputIsWrong}
                    />
                    <Input 
                        id='email' 
                        title='E-mail *' 
                        placeholder="example@skdesign.ru" 
                        isWrong={emailIsWrong} 
                        isRequired
                    />
                    <Input 
                        id='profile' 
                        title='Ссылка на профиль *' 
                        placeholder="instagram.com/skde..." 
                        isWrong={profileIsWrong} 
                        isRequired
                    />
                </div>
            </section>
                 <DropDown 
                     id='city' 
                     title='Выберите город *' 
                     isRequired
                    options={cities}
                 />
                    <Input
                     id='orgName'
                     title='Название организации/студии'
                     placeholder="SK Design"
                 />
            <ExtraFieldsButton
                 isShowed={isExtraFieldsShowed}
                 onClick={showExtraFields}
             />

                     { isExtraFieldsShowed &&
                 <section>
                     <Input
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
                canSend={canSend} 
                onClick={onSent} 
                isPending={sendRequestStatus == 'pending'}/>
        </form>
    )
}
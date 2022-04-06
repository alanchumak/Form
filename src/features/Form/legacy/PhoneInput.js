import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import styles from '../MyInput.module.css';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { fieldChanged, selectField } from '../formSlice'


import { StyledInputMask } from '../PhoneInput/StyledInputMask'
import { StyledInputLabel } from '../baseInputLabelStyles'
import { InputErrorMsg } from '../baseInputErrorMsg'
import { Wrapper } from '../Wrapper'

export const PhoneInput = ({ id, isWrong}) => {
    const errorRef = useRef(null)
    const dispatch = useDispatch()
    const curValue = useSelector(state => selectField(state, [id]))


    const onFocused = (e) => {
        if (!e.target.validity.valid) {
            const error = errorRef.current
            // error.textContent = '';
            error.style.display = 'none';
            e.target.setCustomValidity('')
        }
    }

    const valid = value => {
        if (!value)
            return 'Обязательное поле'
        else if (isWrong(value))
            return 'Некорректный телефон'
        else
            return ''
    }

    const onBlured = (e) => {
        const errMsg = valid(e.currentTarget.value)
        if (errMsg) {
            const error = errorRef.current
            error.style.display = 'block'
            error.textContent = errMsg
            e.target.setCustomValidity(errMsg)
        }
    }

    const onChanged = (e) => {
        const value = e.target.value
        dispatch(fieldChanged({ [id]: value }))
    }

    return (
        <div className={styles.mydiv}>
            <InputMask
                className={styles.myinput}
                // ref={inputRef}
                id={id} 
                type="text"
                placeholder={'+7 (000) 000-00-00'}
                onBlur={onBlured}
                onFocus={onFocused}
                mask="+7 (999) 999-99-99" maskChar="_"
                onChange={onChanged}
                value={curValue}
            />
            <label className={styles.mylabel} htmlFor={id}>Номер телефона *</label>
            {/* <div ref={errorRef} className={styles.myerror} aria-live="polite"></div> */}
            <InputErrorMsg
                ref={errorRef}
                aria-live="polite"
            >
            </InputErrorMsg>
        </div>
    )
}
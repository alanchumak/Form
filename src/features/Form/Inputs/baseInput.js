import React, { useRef, useState } from 'react';
// import styles from '../MyInput.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { fieldChanged, selectField } from '../formSlice'
import { Field } from '../Wrappers/Field'
import styled from 'styled-components';
import { baseInputErrorMsg } from '../baseStyles/baseInputErrorMsg';


export const baseInput = (WrappedComponent) => {

    const StyledInputLabel = styled.label`
    font-family: 'SF UI Display';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.25px;
    color: #828282;

    /****************/
    padding: 0px 5px;

    position: absolute;
    top: 0px;
    left: 10px;

    background: white;
    width: max-content;
    box-sizing: border-box;
    display: block;

    ${WrappedComponent}:focus + & {
        color: #0086A8;
    }

    ${WrappedComponent}:invalid + &  {
        color: #EB5E55;
}
`;

    const InputErrorMsg = styled.div`
        ${baseInputErrorMsg}

        ${WrappedComponent}:invalid ~ &  {
            display: block;
        }

        ${WrappedComponent}:focus ~ &  {
            display: none;
        }
`;

    return ({ title, id, isWrong = false, placeholder, ...props }) => { //todo: если isWrong != false, + *
        const errorRef = useRef(null)
        const dispatch = useDispatch()
        const curValue = useSelector(state => selectField(state, [id]))

        const onFocused = (e) => {
            if (!e.target.validity.valid) {
                e.target.setCustomValidity('')
            }
        }

        const getErrMsg = value => {
            if (isWrong) {
                if (!value)
                    return 'Обязательное поле'
                else if (isWrong(value))
                    return 'Некорректное значение'
            }
            else
                return ''
        }

        const onBlured = (e) => {
            const errMsg = getErrMsg(e.target.value)
            if (errMsg) {
                const error = errorRef.current
                error.textContent = errMsg
                e.target.setCustomValidity(errMsg)
            }
        }

        const onChanged = (e) => {
            const value = e.target.value
            dispatch(fieldChanged({ [id]: value }))
        }

        return (
            <Field>
                <WrappedComponent
                       id={id} 
                    type="text"
                    placeholder={placeholder}
                    onBlur={onBlured}
                    onFocus={onFocused}
                    onChange={onChanged}
                    value={curValue}
                    {...props}
                />
                <StyledInputLabel htmlFor={id}>
                    {title}
                </StyledInputLabel>
                <InputErrorMsg ref={errorRef} aria-live="polite"></InputErrorMsg>
            </Field>
        )
    }
}
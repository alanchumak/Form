import React, {useRef, useState} from 'react';
// import styles from '../MyInput.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { fieldChanged, selectField } from '../formSlice'

import { StyledInput } from '../Inputs/baseInputStyles'
import { StyledInputLabel } from '../baseInputLabelStyles'
import { InputErrorMsg } from '../baseInputErrorMsg'
import { Wrapper } from '../Wrapper'


export const Input = ({ title, placeholder, id, isWrong=false, isRequired}) => {
    const errorRef = useRef(null)
    const dispatch = useDispatch()
    const curValue = useSelector(state => selectField(state, [id]))

    const onFocused = (e)=> {
        if (!e.target.validity.valid){
            const error = errorRef.current
            // error.textContent = '';
            error.style.display = 'none';
            e.target.setCustomValidity('')
        }
    }

    const valid = value => {
        if (isWrong) {
            if(!value)
                return 'Обязательное поле'
            else if (isWrong(value))
                return 'Некорректное значение'
        }
        else
            return ''
    }

    const onBlured = (e) => {
        const errMsg = valid(e.target.value)
        if(errMsg){
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
    //    <div className={styles.mydiv}>
           <Wrapper>
           {/* <input  */}
                {/* className={styles.myinput}  */}
                <StyledInput
            //    id={id} 
                type="text" 
                placeholder={placeholder}
               onBlur={onBlured} 
               onFocus={onFocused} 
               onChange={onChanged}
               value={curValue}
           />
           
           {/* <label
               className={styles.mylabel} */}
           <StyledInputLabel
               htmlFor={id}
           >
               {title}
           </StyledInputLabel>
            {/* </label> */}

           {/* <div 
           className={styles.myerror}  */}
           <InputErrorMsg
                ref={errorRef} 
                aria-live="polite"
           >
           </InputErrorMsg>
           {/* </div> */}

    </Wrapper>     
    // </div>
   )
}
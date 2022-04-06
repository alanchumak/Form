import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import styles from './MyInput.module.css';
import Select, { components } from 'react-select';
import { ArrowClosed, ArrowOpen } from '../OpenCloseArrows';
import { useDispatch, useSelector } from 'react-redux'
import { fieldChanged, selectField } from '../formSlice'



const DropdownIndicator = props => {
    const { menuIsOpen } = props.selectProps;
    const arrow = menuIsOpen ? <ArrowOpen/> : <ArrowClosed/>;
    return (
        <components.DropdownIndicator {...props}>
            {arrow}
        </components.DropdownIndicator>
    );
};


export const DropDown = ({ title, isRequired, id, options }) => {
    const errorRef = useRef(null)
    const labelRef = useRef(null)
    const selectRef = useRef(null)

    const dispatch = useDispatch()
    const curValue = useSelector(state => selectField(state, [id]))

    const [isValid, setIsValid] = useState(true)

    
    //#region нужно для очистки формы
    useEffect(() => {
        if (curValue === ''){
            selectRef.current.setValue('')
            labelRef.current.textContent = ''
            // console.log('useEffect')
            }
    }, [curValue]);
    //#endregion
    
// input имеет ::after, который непонятно как выравнивать
    const customStyles = {
        control: (provided, state) => ({
            background: '#FFFFFF',
            border: '2px solid #E3E3E3',
            borderColor: !isValid ? '#EB5E55'
                : state.isFocused ? '#0086A8' : '#E3E3E3',
            boxSizing: 'border-box',
            borderRadius: '8px',
            paddingLeft: '11px',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingRight: '5px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '100%',
            
            '&:hover':{
                borderColor: isValid && !state.isFocused ? '#E3E3E3' 
                    : state.isFocused && isValid ? '#0086A8' : '#EB5E55' 
            },
            display: 'flex',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            paddingLeft: '0',
            paddingTop: '0',
            paddingBottom: '0',

        }),
        input: (provided, state) => ({
            ...provided,
            paddingLeft: '0',
            marginLeft: '0',

            paddingTop: '0',
            marginTop: '0',
            paddingBottom: '0',
            marginBottom: '0',
        }),
        indicatorSeparator: (provided, state) => ({
            display: 'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            background: '#FFFFFF',
            boxSizing: 'border-box',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',

            color: '#353238',
            border: '0',
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            boxSizing: 'border- box',
            padding: '5px 15px',
            "&:hover": {
                backgroundColor: '#FAFAFA',
            },
            borderBottom: '2px solid #E3E3E3',
            '&:nth-last-of-type(1)': {
                border: '0',
            }
        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: '0',
            '&:first-of-type': {
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
            },
            '&:last-child': {
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
            },
            border: '2px solid #E3E3E3',
            boxSizing: 'border-box',
            boxShadow: '0px 5px 20px rgba(53, 50, 56, 0.14)',
            borderRadius: '8px',
        }),
        container: (provided, state) => ({
            ...provided,
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: !isValid ? '#EB5E55' : 
                state.isFocused ? 'white' : '#353238'
        }),
        // container: (provided, state) => ({
        //     ...provided,
        //     marginTop: '5px',
        // }),
    }

    const hasValue = () => selectRef.current.hasValue()

    const validErr = () => {
        return selectRef.current.hasValue() ? '' : 'Обязятельное поле'
    }

    const onBlured = () => {
        const errMsg = validErr()
        if (errMsg) {
            if (isRequired) {
                setIsValid(false)
                const error = errorRef.current
                error.style.display = 'block'
                error.textContent = errMsg

            }
            labelRef.current.textContent =''
        }
        else
            labelRef.current.style.color = '#828282'
    }

    const onMenuOpened = () => { 
        labelRef.current.textContent = title
        labelRef.current.style.color = '#0086A8'
        // errorRef.current.textContent = ''
        errorRef.current.style = 'none'
        if (!isValid)
            setIsValid(true)
    }

    const onChanged = (e) => {
        const value = e.label
        dispatch(fieldChanged({ [id]: value }))
    }

    return (
        <div className={styles.mydiv} >
            <Select
                ref={selectRef}
                placeholder={title}
                styles={customStyles}
                options={options}
                components={{ DropdownIndicator }}
                onBlur={onBlured}
                onMenuOpen={onMenuOpened}
                onChange={onChanged}
                // value={curValue}
            />
            <label 
                ref={labelRef}
                className={styles.labelDropdawn} 
                // htmlFor={id}
            >
            </label>
            <div ref={errorRef} className={styles.myerror}></div>
        </div>
    )
}

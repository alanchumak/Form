import React from 'react';
import { ArrowClosed, ArrowOpen } from './OpenCloseArrows';
import { Field } from './Wrappers/Field'
import styled from 'styled-components';

const Div = styled.div`
    cursor: pointer;

    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    
    color: #353238;
    width: max-content;

    & span {
        position: relative;
        top: -2px;
        padding-left: 8px;
    }
`;

// в map оборачивать эл-ты в Field
export const ExtraFieldsButton = ({ isShowed = false, onClick}) => {
    const action = isShowed ? 'Скрыть' : 'Показать';
    const arrow = isShowed ? <ArrowOpen /> : <ArrowClosed />
    return (
        <Field> 
            <Div onClick={onClick}>
                {`${action} дополнительные поля`}
                <span>{arrow}</span>
            </Div>
        </Field>
    )
}
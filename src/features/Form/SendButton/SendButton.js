import React from 'react';
import { Spinner } from './Spinner';
import { StyledSendButton } from './StyledSendButton';


export const SendButton = ({ disabled=true, onClick, isPending}) => {
    return (
        <StyledSendButton
            type='button'
            disabled={disabled}
            onClick={onClick}
        >
            {isPending ? <Spinner/> : 'Отправить заявку'}
        </StyledSendButton>
    )
}
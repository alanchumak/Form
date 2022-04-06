import styled from 'styled-components';


export const StyledSendButton = styled.button`
    height: 50px;
    background: #0086A8;
    border-radius: 8px;

    font-family: 'Open Sans'; 
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;

    color: #FFFFFF;

    border: 0;
    display: block;
    width: 100%;

    &:disabled {
        background: #E3E3E3;
        color: #828282;
    }

    &:enabled:hover {
        background: #007693;
    }

    &:enabled:active {
        background: #00657E;
    }
`;
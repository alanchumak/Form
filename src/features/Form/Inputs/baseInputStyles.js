import styled, { css } from 'styled-components';

export const baseInputStyles = css`
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0.25px;

    background: #FFFFFF;
    border: 2px solid #E3E3E3;
    box-sizing: border-box;
    border-radius: 8px;

    height: 50px;
    width: 100%;

    padding: 18px 13px 19px;
    margin-top: 5px;

    &::placeholder{
        color: #CDCAD0;
    }

    &:focus {
        outline-color: #0086A8;
    }

    &:invalid {
        border-color: #EB5E55;
        border-radius: 9px;
    }
`;




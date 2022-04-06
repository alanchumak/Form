import styled, {css} from 'styled-components';
// import { StyledInput } from './StyledInput'

export const baseInputLabelStyles = css`
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
}
`; // должны быть условия для focus и invalid
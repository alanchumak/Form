import styled from 'styled-components';
import { Field } from './Wrappers/Field'

export const StyledForm = styled.form`
    /*margin: 15px;*/
    width: 440px;
    display: block;

    padding: 40px 30px;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px rgba(53, 50, 56, 0.14);
    border-radius: 8px;

    & > ${Field}, section, section > ${Field} {
        margin-bottom: 20px;
    }
`;

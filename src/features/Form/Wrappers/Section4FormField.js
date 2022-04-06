import styled from 'styled-components';
import { Field } from './Field'


export const Section4FormField = styled.div`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    & ${Field} {
    flex: 1 1 170px;
    }

    & ${Field}:nth-of-type(odd) {
        margin-right: 20px;
    }

    & ${Field}:nth-of-type(-n+2) {
        margin-bottom: 20px;
    }
`;

import { baseInput } from './baseInput'
import { baseInputStyles } from './baseInputStyles';
import styled from 'styled-components';

const StyledInput = styled.input`
    ${baseInputStyles}
`;

export const TextInput = baseInput(StyledInput)

//     < TextInput
// id = 'userName'
// title = 'Ваше имя *'
// placeholder = "Иван"
// isWrong = { useNameIsWrong }
//     />

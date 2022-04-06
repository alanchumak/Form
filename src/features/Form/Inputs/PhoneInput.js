import InputMask from 'react-input-mask';
import { baseInput } from './baseInput'
import styled from 'styled-components';
import { baseInputStyles } from './baseInputStyles';


const StyledInputMask = styled(InputMask)`
    ${baseInputStyles}
`;

export const PhoneInput = baseInput(StyledInputMask)

// export const PhoneInput1 = () => {
//   return (props) => <PhoneInput
//     title='Ваш номер *'
//     id='userPhone'
//     placeholder='+7 (000) 000-00-00'
//     mask="+7 (999) 999-99-99"
//     maskChar="_"
//     {...props}
//   />
// }
{/* 
<PhoneInput 
        title='Ваш номер *'
        id='userPhone' 
        placeholder='+7 (000) 000-00-00' 
        isWrong={phoneInputIsWrong} 
        mask="+7 (999) 999-99-99" 
        maskChar="_"
      />
*/}
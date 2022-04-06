import React from 'react';
import {Logo} from './TextBlock/Logo';
import { Form } from './features/Form/Form';
import { TextBlock } from './TextBlock/TextBlock';
import styled from 'styled-components';
import './mystyle.css'


const Layout = styled.div`
    display: flex;
    margin: 100px 100px;

    & ${TextBlock} {
      margin-right: 60px;
    }

     &  ${Form}{
      min-width: 440px;
    };
`;

// видимо, какие-то настройки create-react-app не позволяют настроить корневой компонент через styled-components
function App() {
  return (
    <div className='layout'>
      <div className='myform'><Form /></div>
    </div> 
  );
}

export default App;

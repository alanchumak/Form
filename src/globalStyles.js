import { createGlobalStyle } from "styled-components";
import SF_UI_Display from "./fonts/SF-UI-Display-Regular.woff";

export const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'SF UI Display';
  src: url(${SF_UI_Display}) format('woff2')
}

* {
  box-sizing: border-box;
}

`;



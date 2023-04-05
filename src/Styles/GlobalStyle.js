import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  input:focus {
    outline: none;
  }

`;

export default GlobalStyle;

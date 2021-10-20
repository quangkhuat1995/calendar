import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
;
}

body {
  font-family: 'inter', sans-serif;
}

h1{
  font-size: 36px;
  padding: 10px 0 10px 20px;
}

span {
  font-weight: 100;
}

`;


export default GlobalStyle;
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import HotkeySpeech from './components/HotkeySpeech';
import ParseMusinsa from './components/ParseMusinsa';
import CartContainer from './containers/CartContainer';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 100%;
    height: 600px;
  }
`
const HideAppStyleBlock = styled.div`
  display: none; /* 숨긴다.
  width:400px; */
`
const AppStyleBlock = styled.div`
    background-color: #dddddd;
    width:400px;
`

function App() {
  let protocol = window.location.protocol;
  return (
    <>
      <GlobalStyle />
      { protocol.includes("chrome-extension") ? (
        //true ? (
        <AppStyleBlock>
          <CartContainer/>
        </AppStyleBlock>
      ) : (
        <HideAppStyleBlock>
          <HotkeySpeech />
          <ParseMusinsa />
        </HideAppStyleBlock>
      )}
    </>
  )
}

export default App;

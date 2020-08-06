import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import Speech from './components/Speech';
import Hotkey from './components/Hotkey';
import Parse from './components/Parse';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 100%;
    height: 600px;
  }
`

const AppStyleBlock = styled.div`
  display: none; /* 숨긴다. */
  background-color: #dddddd;
  width:400px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <AppStyleBlock>
        <Speech />
        <Hotkey />
        <Parse />
      </AppStyleBlock>
    </>
  )
}

export default App;

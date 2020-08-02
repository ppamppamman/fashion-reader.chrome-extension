import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import Speech from './components/Speech';
import Hotkey from './components/Hotkey';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 100%;
    height: 600px;
  }
`

const AppStyleBlock = styled.div`
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
      </AppStyleBlock>
    </>
  )
}

export default App;

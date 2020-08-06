import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import HotkeySpeech from './components/HotkeySpeech';
import ParseMusinsa from './components/ParseMusinsa';

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
        <HotkeySpeech />
        <ParseMusinsa />
      </AppStyleBlock>
    </>
  )
}

export default App;

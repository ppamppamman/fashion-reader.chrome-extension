import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import HotkeySpeech from './components/HotkeySpeech';
import ParseMusinsa from './components/ParseMusinsa';
import TargetMusinsa from './components/TargetMusinsa';
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
    width:400px;
`

function App() {
  let protocol = window.location.protocol;
  let scenarios = [
    "1021325/0", "1063709/0", "1370841/0", "1305013/0", 
    "412702/0", "454584/0", "949615/0", "412704/0", "624632/0",
    "840830/0", "987352/0", "1103286/0"
    ]
  
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
          { scenarios.includes(window.location.pathname.split("/app/product/detail/")[1]) ? ( 
            <TargetMusinsa /> 
            ) : ( 
            <ParseMusinsa /> 
          )}
        </HideAppStyleBlock>
      )}
    </>
  )
}

export default App;

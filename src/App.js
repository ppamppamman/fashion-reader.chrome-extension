import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// import ParseMusinsa from './components/ParseMusinsa';
import CartContainer from './containers/CartContainer';
import CartButtonContainer from './containers/CartButtonContainer';

import Parse11st from './components/Parse11st';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 100%;
    height: 600px;
  }
`;
const AbsoluteAppStyleBlock = styled.div`
	/* display: none; /* 숨긴다. */
	position: absolute;
`;
const AppStyleBlock = styled.div`
	width: 400px;
`;

function App() {
	let protocol = window.location.protocol;

	return (
		<>
			<GlobalStyle />
			{protocol.includes('chrome-extension') ? (
				<AppStyleBlock>
					<CartContainer />
				</AppStyleBlock>
			) : (
				<AbsoluteAppStyleBlock>
					<CartButtonContainer />
					{/* {window.location.origin === 'http://www.11st.co.kr' && <Parse11st />} */}
				</AbsoluteAppStyleBlock>
			)}
		</>
	);
}

export default App;

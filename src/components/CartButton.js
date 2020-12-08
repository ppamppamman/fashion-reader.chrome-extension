import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	background-color: gray;
	color: white;
	width: 30px;
	height: 30px;
	border-radius: 50%;
`;

const CartButton = (props) => {
	const { onCartButtonClick } = props;

	return <Button onClick={onCartButtonClick}> + </Button>;
};

export default CartButton;

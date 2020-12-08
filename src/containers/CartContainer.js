import React, { useState, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
// import { addItem, deleteItem, changeCurrentId, syncWithStorage } from '../modules/cart';
import Cart from '../components/Cart';
// import MetaTags from 'react-meta-tags';

function initStorageData() {
	window.chrome.runtime.sendMessage({ method: 'INIT_CART' }, (response) => {
		window.localStorage.setItem('watchListUrl', JSON.stringify([]));
		console.log('메세지 결과: ', response.data);
	});
}

function getStorageData(cart, setCart) {
	window.chrome.runtime.sendMessage({ method: 'GET_CART' }, (response) => {
		console.log('메세지 결과: ', response.data);
		console.log('메세지 cart: ', response.cart);

		setCart(response.cart);
		return response.cart;
	});
}

function CartContainer() {
	let initialState = {
		currentId: 1,
		items: [],
	};
	const [cart, setCart] = useState(initialState);

	useEffect(() => {
		console.log('cart컨테이너 테스트 useEffect');
		console.log('cart 값은 : ', cart);
		console.log(cart?.items);
		console.log(cart?.items.length);
		if (cart?.items.length == 0) {
			setCart(getStorageData(cart, setCart));
			console.log('cart update ? ', cart);
		}
		console.log('CartContainer cart :', cart);
	}, [cart]);

	return (
		<>
			<h1>통합 장바구니 시스템</h1>
			<button onClick={initStorageData}>init</button>
			<br />
			<Cart cart={cart} />
		</>
	);
}

export default CartContainer;

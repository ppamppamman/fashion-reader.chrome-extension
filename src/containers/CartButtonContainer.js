import React, { useEffect } from 'react';
import CartButton from '../components/CartButton';

const CartButtonContainer = () => {
	useEffect(() => {
		const app = document.querySelector('#app-root');
		app.style.zIndex = 999;
		app.style.position = 'fixed';
		app.style.top = '80%';
		app.style.left = '90%';
	}, []);

	const init = (target) => {
		return JSON.parse(window.localStorage.getItem(target)) ? JSON.parse(window.localStorage.getItem(target)) : [];
	};
	let watchListUrl = init('watchListUrl'); // 리팩토링 필요 -> 로컬스토리지가 아닌 크롬스토리지에서 받아서 처리하도록
	// localStorage.removeItem('watchListUrl');
	const checkValidUrl = (link) => {
		let targetUrls = ['https://store.musinsa.com', 'https://www.g9.co.kr', 'http://www.11st.co.kr', 'http://itempage3.auction.co.kr'];
		return targetUrls.includes(link);
	};

	const checkWatchListUrl = (link) => {
		return watchListUrl.includes(link);
	};

	const onCartButtonClick = () => {
		console.log('onCartButtonClick');
		if (!checkValidUrl(window.location.origin)) {
			return;
		}

		if (checkWatchListUrl(window.location.href)) {
			alert('이미 담긴 상품입니다.');
		} else {
			alert('저장이 시작됩니다.');

			let target = {};
			if (window.location.origin.includes('11st')) {
				target = {
					watchListUrl: window.location.href,
					watchListImg: document.querySelector('.img_full > img').src,
					watchListTitle: document.querySelector('.c_product_info_title > h1').innerText,
					watchListPrice: document.querySelector('.price > dd > strong > span.value').innerText + '원',
					watchListOrigin: '11st',
				};
			} else if (window.location.origin.includes('g9')) {
				target = {
					watchListUrl: window.location.href,
					watchListImg: document.querySelector('img#goodsImage').src,
					watchListTitle: document.querySelector('.v3_item_info > p > strong#subjText4').innerText,
					watchListPrice: document.querySelector('.text__price').innerText + '원',
					watchListOrigin: 'g9',
				};
			} else if (window.location.origin.includes('auction')) {
				target = {
					watchListUrl: window.location.href,
					watchListImg: document.querySelector('ul > li > a > img').src,
					watchListTitle: document.querySelector('.text__item-title').innerText,
					watchListPrice: document.querySelector('.price_real').innerText,
					watchListOrigin: 'auction',
				};
			}

			window.chrome.runtime.sendMessage({ method: 'POST_ITEM_INFO', value: target }, function (response) {
				console.log(response.data);
				console.log('준비 완료');
			});

			// checkWatchListUrl을 위한 레거시
			watchListUrl.push(window.location.href);
			window.localStorage.setItem('watchListUrl', JSON.stringify(watchListUrl));
		}
	};
	return <CartButton onCartButtonClick={onCartButtonClick} />;
};

export default CartButtonContainer;

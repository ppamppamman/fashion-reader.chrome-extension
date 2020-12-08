import React, { useEffect } from 'react';

const Parse11st = () => {
	// init
	const init = (target) => {
		return JSON.parse(window.localStorage.getItem(target)) ? JSON.parse(window.localStorage.getItem(target)) : [];
	};
	let watchListUrl = init('watchListUrl'); // 리팩토링 필요 -> 로컬스토리지가 아닌 크롬스토리지에서 받아서 처리하도록

	const checkValidUrl = (link) => {
		let targetUrl = 'http://www.11st.co.kr/products';
		return link.includes(targetUrl);
	};

	const checkWatchListUrl = (link) => {
		return watchListUrl.includes(link);
	};

	useEffect(() => {
		if (!checkValidUrl(window.location.href)) {
			return;
		}

		if (checkWatchListUrl(window.location.href)) {
			console.log('이미 담긴 상품');
		} else {
			console.log('저장 시작');

			let target = {
				watchListUrl: window.location.href,
				watchListImg: document.querySelector('.img_full > img').src,
				watchListTitle: document.querySelector('.c_product_info_title > h1').innerText,
				watchListPrice: document.querySelector('span.value').innerText + '원',
			};

			window.chrome.runtime.sendMessage({ method: 'POST_ITEM_INFO', value: target }, function (response) {
				console.log(response.data);
				console.log('준비 완료');
			});

			// checkWatchListUrl을 위한 레거시
			watchListUrl.push(window.location.href);
			window.localStorage.setItem('watchListUrl', JSON.stringify(watchListUrl));
		}
	});
	return null;
};

export default Parse11st;

import React, { useState } from 'react';

function CartItem({ each, onToggle }) {
	let target, utterance;
	let desc = [];
	let voiceIdx;

	console.log('카트아이템');

	const onClickRepeat = (targetId) => {
		console.log('targetId : ', targetId);

		window.chrome.runtime.sendMessage({ method: 'GET_SPECIFIC_ITEM', targetId: targetId }, async (response) => {
			await console.log('메세지 확인', response);
			await console.log('메세지 확인 itemInfo : ', response.item.itemInfo);

			target = response.item.itemInfo.watchListDesc;
			// 타겟 분할
			let limit = Math.ceil(target.length / 100);
			for (let i = 0; i < limit; i++) {
				let tempTarget = target.substring(i * 100, i * 100 + 100);
				await console.log('target', i, tempTarget);
			}
		});
	};

	const onClickRedirect = (targetId) => {
		console.log('targetId : ', targetId);
		target = '상품 창이 열립니다.';
		window.chrome.runtime.sendMessage({ method: 'GET_SPECIFIC_ITEM', targetId: targetId }, async (response) => {
			await window.open(response.item.itemInfo.watchListUrl);
		});
	};

	return (
		<>
			<div className="divider" style={{ width: '90%', height: '0', margin: '2%', overflow: 'hidden', 'border-top': '1px solid #e1e6ea' }}></div>
			<div className="cartItem" style={{ width: '85%', margin: '2%', padding: '2%' }}>
				<div className="cartItem-text">
					<h1> {each.itemInfo.watchListTitle} </h1>
					<h3>
						{each.itemInfo.watchListPrice} @{each.itemInfo.watchListOrigin}
					</h3>
					<br />
				</div>
				<div className="cartItem-img" style={{ 'text-align': 'center' }}>
					<img width="200px" src={each.itemInfo.watchListImg} />
					<br /> <br />
				</div>
				<div className="cartItem-buttons" style={{ width: '100%' }}>
					<br />
					<button
						onClick={() => {
							onClickRedirect(each.id);
						}}
						className="cartItem-button-repeat"
						style={{ 'border-radius': '30px', 'border-color': '#FC6F53', 'font-size:': '20px', 'background-color': '#FC6F53', width: '100%', color: 'white' }}
					>
						<span style={{ 'font-size': '2em' }}>사러 가기</span>
					</button>
				</div>
			</div>
		</>
	);
}

function CartItemList({ cart }) {
	console.log('카트에 담길 items : ', cart);
	return (
		<>
			{cart?.items.map((item, idx) => (
				<CartItem each={item} key={idx} />
			))}
		</>
	);
}

function Cart({ cart, onCreate, onDelete }) {
	console.log('cart : ', cart);
	return (
		<div className="cart">
			<CartItemList cart={cart} />
		</div>
	);
}

export default Cart;

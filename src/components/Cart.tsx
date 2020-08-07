import React, { ReactElement, useEffect, useState } from 'react';

import './Cart.scss';
import { AddedItem } from './../App';

interface Props {
	addedItems: AddedItem[];
}

export default function Cart({ addedItems }: Props): ReactElement {
	const exchangeRate = 1100;

	const [sum, setSum] = useState<number>(0); // total amount of selected items.
	const [isKRW, toggleIsKRW] = useState<boolean>(false); // to toggle display of currency.

	// update sum state when addedItems changed.
	useEffect(() => {
		const total = addedItems.reduce((a, c) => a + c.price, 0);
		setSum(total);
	}, [addedItems]);

	return (
		<div className="Cart">
			<h2>Cart Area</h2>
			<ul className="added-items-list">
				{addedItems.map((item) => (
					<li key={item.title}>{item.title}</li>
				))}
			</ul>
			<p>{`${addedItems.length} items selected.`}</p>
			<p className="total-amount">
				<span>
					{`Total: ${
						isKRW
							? `￦${(sum * exchangeRate).toLocaleString()}`
							: `$${sum.toLocaleString()}`
					}`}
				</span>
				<span>
					<button
						className="toggle-btn"
						onClick={() => toggleIsKRW(!isKRW)}
					>
						{isKRW ? 'To USD' : 'To KRW'}
					</button>
				</span>
			</p>
		</div>
	);
}

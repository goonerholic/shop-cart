import React, { ReactElement } from 'react';
import { ItemInfo } from '../App';

import './Item.scss';

interface Props {
	itemInfo: ItemInfo;
	onToggle: (id: number) => void;
}

// id: number;
// title: string;
// price: number;
// category: string;
// description: string;
// image: string;

export default function Item({ itemInfo, onToggle }: Props): ReactElement {
	const { id, title, price, category, image, selected } = itemInfo;

	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onToggle(id);
	};
	return (
		<div className={`Item${selected ? ' selected' : ''}`} onClick={onClick}>
			{selected && <div className="overlay">✔</div>}
			<div className="image-area flex-item">
				<img alt={`shopping-item-${title}`} src={image} />
			</div>
			<div className="flex-item detail">
				<h4>{`${id}: ${title}`}</h4>
				<p>{`Price: $${price}`}</p>
				<p>{`Category: ${category}`}</p>
			</div>
		</div>
	);
}

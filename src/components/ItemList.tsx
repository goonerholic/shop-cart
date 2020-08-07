import React, { ReactElement } from 'react';
import Item from './Item';
import { ItemInfo } from '../App';

import './ItemList.scss';

interface Props {
	items: ItemInfo[];
	onToggle: (id: number) => void;
}

export default function ItemList({ items, onToggle }: Props): ReactElement {
	return (
		<div className="ItemList">
			{items.map((item) => (
				<Item key={item.title} itemInfo={item} onToggle={onToggle} />
			))}
		</div>
	);
}

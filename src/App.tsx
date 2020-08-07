import React, { useState, useEffect } from 'react';
import './App.scss';

import axios, { AxiosResponse } from 'axios';
import ItemList from './components/ItemList';
import Cart from './components/Cart';

// [type declarations]
export interface FetchedItem {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
}

export interface ItemInfo extends FetchedItem {
	selected: boolean;
}

export interface AddedItem {
	id: number;
	title: string;
	price: number;
}

// request url to get item list
const requestString = 'https://fakestoreapi.com/products?limit=20';

function App() {
	const [items, setItems] = useState<ItemInfo[]>(
		JSON.parse(sessionStorage.getItem('items') as string) || [],
	); // state for shopping item list.

	// state for items added to the cart.
	// get added Items from session storage
	const [addedItems, setAddedItems] = useState<AddedItem[]>(
		JSON.parse(sessionStorage.getItem('addedItems') as string) || [],
	);

	// when the component rendered, fetch shopping item list from API.
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response: AxiosResponse<FetchedItem[]> = await axios(
					requestString,
				);
				// additional property
				setItems(response.data.map((d) => ({ ...d, selected: false })));
			} catch (e) {
				console.log(e);
			}
		};
		if (!items.length) {
			fetchItems();
		}
	}, []);

	// set addedItems to session storage
	useEffect(() => {
		sessionStorage.setItem('addedItems', JSON.stringify(addedItems));
		sessionStorage.setItem('items', JSON.stringify(items));
	}, [addedItems, items]);

	// fires when items are clicked.
	const onToggle = (id: number) => {
		const newItems = items.map((item) =>
			item.id === id ? { ...item, selected: !item.selected } : item,
		);

		const newAddedItems = newItems
			.filter((item) => item.selected)
			.map((item) => ({
				...item,
				title: item.title.slice(0, 20) + '...',
			}));

		// update the selected property of clicked item and add that item to the cart list.
		setItems(newItems);
		setAddedItems(newAddedItems);
	};

	return (
		<div className="App">
			<ItemList items={items} onToggle={onToggle} />
			<Cart addedItems={addedItems} />
		</div>
	);
}

export default App;

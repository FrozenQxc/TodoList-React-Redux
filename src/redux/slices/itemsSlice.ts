import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemType {
	id: string
	title: string
}

interface ItemsType {
	items: ItemType[]
}

const initialState: ItemsType = {
	items: [
		{
			id: '1',
			title: 'Абоба',
		},
		{
			id: '2',
			title: 'Абоба1',
		},
		{
			id: '3',
			title: 'Абоба1',
		},
	],
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<ItemType[]>) {
			state.items = action.payload
		},
		removeItems(state, action: PayloadAction<string[]>) {
			const removedItem = state.items.find(obj => obj.id === action.payload)
		},
	},
})

export const { setItems, removeItems } = itemsSlice.actions

export default itemsSlice.reducer

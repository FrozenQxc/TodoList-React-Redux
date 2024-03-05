import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TodoType {
	id: string
	title: string
	description: string
	time: string
}
interface ItemsState {
	todoList: TodoType[]
}

const getInitialTodo = (): TodoType[] => {
	const localTodoList = window.localStorage.getItem('todoList')
	if (localTodoList) {
		return JSON.parse(localTodoList) as TodoType[]
	}
	window.localStorage.setItem('todoList', JSON.stringify([]))
	return []
}

const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		todoList: getInitialTodo(),
	} as ItemsState,
	reducers: {
		addTodo: (state, action: PayloadAction<TodoType>) => {
			if (state.todoList) {
				state.todoList.push(action.payload)
				const todoListArr = JSON.parse(
					window.localStorage.getItem('todoList') || '[]'
				)
				todoListArr.push({
					...action.payload,
				})
				window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
			} else {
				window.localStorage.setItem(
					'todoList',
					JSON.stringify([{ ...action.payload }])
				)
			}
		},
	},
})

export const { addTodo } = itemsSlice.actions

export default itemsSlice.reducer

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TodoType {
	id: string
	title: string
	status: string
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
	return []
}

const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		todoList: getInitialTodo(),
	} as ItemsState,
	reducers: {
		addTodo: (state, action: PayloadAction<TodoType>) => {
			state.todoList.push(action.payload)
			window.localStorage.setItem('todoList', JSON.stringify(state.todoList))
		},
		removeTodo: (state, action: PayloadAction<string>) => {
			const todoId = action.payload
			state.todoList = state.todoList.filter(todo => todo.id !== todoId)
			window.localStorage.setItem('todoList', JSON.stringify(state.todoList))
		},
		completeTodo: (
			state,
			action: PayloadAction<{ id: string; status: string }>
		) => {
			const { id, status } = action.payload
			state.todoList = state.todoList.map(todo => {
				if (todo.id === id) {
					return { ...todo, status: status }
				}
				return todo
			})
			window.localStorage.setItem('todoList', JSON.stringify(state.todoList))
		},
	},
})

export const { addTodo, removeTodo, completeTodo } = itemsSlice.actions

export default itemsSlice.reducer

import { ChangeEvent, useState } from 'react'
import TodoList from './components/card'

export default function App() {
	const [value, setValue] = useState<string>('')
	const [todo, setTodo] = useState<string[]>(['Похавать', 'Похавать'])

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const addTodo = () => {
		setTodo([value, ...todo])
	}

	return (
		<div className='flex justify-center items-center bg-[#111] h-screen  flex-col '>
			<div className='flex gap-2'>
				<input type='text' onChange={handleInput} />
				<button className='border p-3' onClick={addTodo}>
					Добавить
				</button>
			</div>
			<TodoList />
		</div>
	)
}

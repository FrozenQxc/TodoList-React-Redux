import { useState } from 'react'
import ModalAddTodo from './components/ModalAddTodo'
import TodoList from './components/card'
import { Button } from './components/ui/button'

export default function App() {
	const [active, setActive] = useState<boolean>(false)

	return (
		<div className='flex justify-center items-center bg-[#111] h-screen flex-col'>
			<div className='flex gap-2'>
				<input type='text' />
				<Button onClick={() => setActive(true)} variant='secondary'>
					Добавить
				</Button>
			</div>
			{active && <ModalAddTodo setActive={setActive} />}
			<TodoList />
		</div>
	)
}

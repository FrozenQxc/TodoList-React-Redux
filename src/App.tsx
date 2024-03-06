import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import ModalAddTodo from './components/ModalAddTodo'
import TodoList from './components/TodoList'

export default function App() {
	const [active, setActive] = useState<boolean>(false)
	return (
		<div className=' bg-[#111] min-h-screen'>
			
			{active && <ModalAddTodo setActive={setActive} />}
			<Header setActive={setActive} />
			<TodoList />
			<ToastContainer />
		</div>
	)
}

import { ChangeEvent, useState } from 'react'

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

			<ul className='text-white w-[300px]'>
				{todo.map((todo, index) => (
					<li
						className='bg-white  cursor-pointer flex text-center justify-center  text-green-500  mt-2 hover:bg-black hover:text-white '
						key={index}
					>
						{todo}
					</li>
				))}
			</ul>
		</div>
	)
}

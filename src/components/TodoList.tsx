import { useAppSelector } from '@/hooks/hooks'
import { useState } from 'react'
import { RootState } from '../redux/store'
import TodoItems from './TodoItems'

const TodoList = () => {
	const [select, setSelect] = useState<string>('all')

	const items = useAppSelector((state: RootState) => state.itemsSlice.todoList)

	const filteredItems =
		select === 'all' ? items : items.filter(item => item.status === select)

	return (
		<main className='flex justify-center items-center flex-col mx-auto flex-wrap gap-5 p-5'>
			<select onChange={e => setSelect(e.target.value)} className='p-3'>
				<option value='all'>Все</option>
				<option value='incomplete'>Не выполненные</option>
				<option value='completed'>Выполненные</option>
			</select>
			{filteredItems.map((el, index) => (
				<TodoItems key={index} {...el} />
			))}
		</main>
	)
}

export default TodoList

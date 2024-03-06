import { TodoType } from '@/Types/type'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setTodoList } from '@/redux/slices/itemsSlice'
import { Reorder } from 'framer-motion'
import { useState } from 'react'
import { RootState } from '../redux/store'
import TodoItems from './TodoItems'

const TodoList = () => {
	const [select, setSelect] = useState<string>('all')
	const dispatch = useAppDispatch()

	const handleReorder = (newItems: TodoType[]) => {
		dispatch(setTodoList(newItems))
	}

	const items = useAppSelector((state: RootState) => state.itemsSlice.todoList)

	const filteredItems =
		select === 'all' ? items : items.filter(item => item.status === select)

	return (
		<main className='flex justify-center items-center flex-col mx-auto flex-wrap '>
			<select onChange={e => setSelect(e.target.value)} className='p-3'>
				<option value='all'>Все</option>
				<option value='incomplete'>Не выполненные</option>
				<option value='completed'>Выполненные</option>
			</select>
			<Reorder.Group axis='y' values={items} onReorder={handleReorder}>
				<div className='scroll'>
					{filteredItems.map(el => (
						<Reorder.Item key={el.id} value={el}>
							<TodoItems key={el.id} {...el} />
						</Reorder.Item>
					))}
				</div>
			</Reorder.Group>
		</main>
	)
}

export default TodoList

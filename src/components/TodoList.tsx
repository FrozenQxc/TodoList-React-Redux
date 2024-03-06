import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { cn } from '@/lib/utils'
import { completeTodo, removeTodo } from '@/redux/slices/itemsSlice'
import { X } from 'lucide-react'
import { useState } from 'react'
import { RootState } from '../redux/store'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TodoList = () => {
	const items = useAppSelector((state: RootState) => state.itemsSlice.todoList)
	const dispatch = useAppDispatch()
	const [select, setSelect] = useState<string>('all')

	const handleRemoveTodo = (id: string) => {
		dispatch(removeTodo(id))
	}

	const handleToggleComplete = (id: string, status: string) => {
		const newStatus = status === 'completed' ? 'incomplete' : 'completed'
		dispatch(completeTodo({ id, status: newStatus }))
	}

	const filteredItems =
		select === 'all' ? items : items.filter(item => item.status === select)

	return (
		<main className='flex justify-center items-center flex-col mx-auto flex-wrap gap-5 p-5'>
			<select
				value={select}
				onChange={e => setSelect(e.target.value)}
				className='p-3'
			>
				<option value='all'>Все</option>
				<option value='incomplete'>Не выполненные</option>
				<option value='completed'>Выполненные</option>
			</select>

			<div className='scroll'>
				{filteredItems.map((item, index) => (
					<Card
						className={cn('m-8  md:w-[500px] cursor-grab ', {
							'bg-green-500': item.status === 'completed',
						})}
						key={index}
					>
						<CardHeader>
							<div className='flex justify-between items-center text-center'>
								<CardTitle className='text-[20px] md:text-[22px] flex gap-2'>
									<div className='flex gap-3 items-center'>
										<input
											type='checkbox'
											className='h-5 w-5'
											checked={item.status === 'completed'}
											onChange={() =>
												handleToggleComplete(item.id, item.status)
											}
										/>
										{item.title}
									</div>
								</CardTitle>
								<div className='space-x-2'>
									<Button
										onClick={() => handleRemoveTodo(item.id)}
										variant='outline'
										size='icon'
										className='hover:bg-red-500'
									>
										<X />
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className='flex text-center flex-col gap-2 md:text-start'>
								<p>{item.description}</p>
								<p className='text-muted-foreground'>
									{item.time.slice(0, 10)}
								</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	)
}

export default TodoList

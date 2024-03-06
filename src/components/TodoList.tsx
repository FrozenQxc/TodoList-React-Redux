import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { cn } from '@/lib/utils'
import { completeTodo, removeTodo } from '@/redux/slices/itemsSlice'
import { BadgeCheck, X } from 'lucide-react'
import { useState } from 'react'
import { RootState } from '../redux/store'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TodoList = () => {
	const items = useAppSelector((state: RootState) => state.itemsSlice.todoList)
	const dispatch = useAppDispatch()
	const [select, setSelect] = useState<string>('all')

	const handleCompleteTodo = (id: string) => {
		dispatch(completeTodo(id))
	}

	const handleRemoveTodo = (id: string) => {
		dispatch(removeTodo(id))
	}

	const filteredItems =
		select === 'all' ? items : items.filter(item => item.status === select)

	return (
		<main className='flex justify-center items-center flex-col mx-auto flex-wrap'>
			<select
				value={select}
				onChange={e => setSelect(e.target.value)}
				className='p-3'
			>
				<option value='all'>Все</option>
				<option value='incomplete'>Не выполенные</option>
				<option value='completed'>Выполненные</option>
			</select>

			{filteredItems.map((item, index) => (
				<Card
					className={cn('m-8 w-[500px] cursor-grab', {
						'bg-green-500': item.status === 'completed',
					})}
					key={index}
				>
					<CardHeader>
						<div className='flex flex-wrap justify-between items-center'>
							<CardTitle>{item.title}</CardTitle>
							<div className='space-x-2'>
								<Button
									onClick={() => handleCompleteTodo(item.id)}
									variant='outline'
									size='icon'
									className={cn('hover:bg-green-500', {
										hidden: item.status === 'completed',
									})}
								>
									<BadgeCheck />
								</Button>
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
						<div className='flex flex-col gap-2'>
							<p className=''>{item.description}</p>
							<p className='text-muted-foreground'>{item.time.slice(0, 10)}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</main>
	)
}

export default TodoList

import { useAppDispatch } from '@/hooks/hooks'
import { cn } from '@/lib/utils'
import { completeTodo, removeTodo } from '@/redux/slices/itemsSlice'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import ModalEditTodo from './ModalEditTodo'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Props {
	id: string
	title: string
	status: string
	description: string
	time: string
}

const TodoItems = ({ id, title, status, description, time }: Props) => {
	const [active, setActive] = useState<boolean>(false)

	const dispatch = useAppDispatch()

	const handleToggleComplete = (id: string, status: string) => {
		const newStatus = status === 'completed' ? 'incomplete' : 'completed'
		dispatch(completeTodo({ id, status: newStatus }))
	}

	const handleRemoveTodo = (id: string) => {
		dispatch(removeTodo(id))
	}

	return (
		<div className='scroll'>
			{active && (
				<ModalEditTodo
					id={id}
					title={title}
					description={description}
					status={status}
					time={time}
					setActive={setActive}
				/>
			)}
			<Card
				className={cn('m-8 md:w-[500px] cursor-grab', {
					'bg-green-500': status === 'completed',
				})}
			>
				<CardHeader>
					<div className='flex justify-between items-center text-center'>
						<CardTitle className='text-[20px] md:text-[22px] flex gap-2'>
							<div className='flex gap-3 items-center text-center'>
								<input
									type='checkbox'
									className='h-5 w-5'
									checked={status === 'completed'}
									onChange={() => handleToggleComplete(id, status)}
								/>
								<label>{title}</label>
							</div>
						</CardTitle>
						<div className='space-x-2'>
							<Button
								onClick={() => setActive(true)}
								variant='outline'
								size='icon'
								className='hover:bg-blue-500'
							>
								<Pencil />
							</Button>
							<Button
								onClick={() => handleRemoveTodo(id)}
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
						<p>{description}</p>
						<p className='text-muted-foreground'>{time.slice(0, 10)}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default TodoItems

import { useAppSelector } from '@/hooks/hooks'
import { BadgeCheck, X } from 'lucide-react'
import { RootState } from '../redux/store'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TodoList = () => {
	const items = useAppSelector((state: RootState) => state.itemsSlice.todoList)
	// const dispatch = useAppDispatch()

	return (
		<main className='flex justify-center items-center flex-col mx-auto w-[1300px]'>
			{/* <Reorder.Group values={items}> */}
			{items.map((item, index) => (
				// <Reorder.Item value={item}>
				<Card className='m-8 w-[500px] cursor-grab' key={index}>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<CardTitle>{item.title}</CardTitle>
							<div className='space-x-2'>
								<Button
									variant='outline'
									size='icon'
									className='hover:bg-green-500'
								>
									<BadgeCheck />
								</Button>
								<Button
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
						<p>{item.time.slice(0, 10)}</p>
					</CardContent>
				</Card>
				// </Reorder.Item>
			))}
			{/* </Reorder.Group> */}
		</main>
	)
}

export default TodoList

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setItems } from '@/redux/slices/itemsSlice'
import { Reorder } from 'framer-motion'
import { BadgeCheck, X } from 'lucide-react'
import { RootState } from '../redux/store'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TodoList = () => {
	const items = useAppSelector((state: RootState) => state.itemsSlice.items)
	const dispatch = useAppDispatch()

	return (
		<main>
			<Reorder.Group values={items} onReorder={e => dispatch(setItems(e))}>
				{items.map((item, index) => (
					<Reorder.Item value={item}>
						<Card className='m-8 w-[300px] cursor-grab' key={index}>
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
								<p></p>
							</CardContent>
						</Card>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</main>
	)
}

export default TodoList

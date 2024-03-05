import { Reorder } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TodoList = () => {
	const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])

	return (
		<main>
			<Reorder.Group values={items} onReorder={setItems}>
				{items.map((item, index) => (
					<Reorder.Item value={item}>
						<Card className='m-8 w-[300px]' key={index}>
							<CardHeader>
								<CardTitle>Items {index}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>Описание</p>
							</CardContent>
						</Card>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</main>
	)
}

export default TodoList

import { useAppDispatch } from '@/hooks/hooks'
import { addTodo } from '@/redux/slices/itemsSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import ModalWrap from './ui/ModalWrap'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
	setActive: (arg: boolean) => void
}

const ModalAddTodo = ({ setActive }: Props) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const dispatch = useAppDispatch()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (title) {
			dispatch(
				addTodo({
					id: uuid(),
					title,
					description,
					status: 'incomplete',
					time: new Date().toLocaleString(),
				})
			)
			toast.success('Успешно добавлено')
			setActive(false)
		} else {
			if (!title) toast.error('Название не должно быть пустым')
		}
	}

	return (
		<ModalWrap setActive={setActive}>
			<form
				onSubmit={handleSubmit}
				className='w-[350px]  md:w-[400px] h-[230px] flex flex-col justify-between'
			>
				<div className='p-2 flex text-gray-500 text-[18px] border-b'>
					Добавить таску
				</div>
				<div className='flex flex-col gap-5 m-3'>
					<Input
						autoFocus
						placeholder='Название'
						onChange={e => setTitle(e.target.value)}
					/>
					<Input
						placeholder='Описание'
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className='flex justify-center gap-x-3 p-2'>
					<Button type='submit'>Добавить</Button>{' '}
					<Button onClick={() => setActive(false)}>Закрыть</Button>
				</div>
			</form>
		</ModalWrap>
	)
}

export default ModalAddTodo

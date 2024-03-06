import { useAppDispatch } from '@/hooks/hooks'
import { updateTodo } from '@/redux/slices/itemsSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ModalWrap from './ui/ModalWrap'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
	setActive: (arg: boolean) => void
	id: string
	title: string
	status: string
	description: string
	time: string
}

const ModalEditTodo = ({
	id,
	title: initialTitle,
	status,
	description: initialDescription,
	time,
	setActive,
}: Props) => {
	const [title, setTitle] = useState(initialTitle)
	const [description, setDescription] = useState(initialDescription)

	const dispatch = useAppDispatch()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (title.trim()) {
			dispatch(
				updateTodo({
					id: id,
					title: title,
					description: description,
					status: status,
					time: time,
				})
			)
			toast.success('Задача успешно обновлена')
			setActive(false)
		} else {
			toast.error('Название не должно быть пустым')
		}
	}

	return (
		<ModalWrap setActive={setActive}>
			<form
				onSubmit={handleSubmit}
				className='w-[350px] md:w-[400px] h-[230px] flex flex-col justify-between'
			>
				<div className='p-2 flex text-gray-500 text-[18px] border-b'>
					Изменить таску
				</div>
				<div className='flex flex-col gap-5 m-3'>
					<Input
						autoFocus
						placeholder='Название'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Input
						placeholder='Описание'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className='flex justify-center gap-x-3 p-2'>
					<Button type='submit'>Обновить</Button>{' '}
					<Button onClick={() => setActive(false)}>Закрыть</Button>
				</div>
			</form>
		</ModalWrap>
	)
}

export default ModalEditTodo

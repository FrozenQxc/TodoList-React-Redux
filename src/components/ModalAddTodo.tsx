import { useAppDispatch } from '@/hooks/hooks'
import { cn } from '@/lib/utils'
import { addTodo } from '@/redux/slices/itemsSlice'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
	setActive: (arg: boolean) => void
}

const ModalAddTodo = ({ setActive }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const dispatch = useAppDispatch()

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setActive(false)
		}
	}

	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setActive(false)
		}
	}

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

	useEffect(() => {
		window.addEventListener('keydown', handleEscape)
		window.addEventListener('mousedown', handleClickOutside)

		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 55)

		return () => {
			clearTimeout(timer)
			window.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<div
			className={cn(
				'fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity',
				{ 'opacity-100': isVisible, 'opacity-0': !isVisible }
			)}
		>
			<div
				ref={modalRef}
				className={cn(
					'mx-auto bg-white rounded-md overflow-hidden transform transition-transform',
					{ 'scale-100': isVisible, 'scale-90': !isVisible }
				)}
			>
				<form
					onSubmit={handleSubmit}
					className='w-[400px] h-[230px] flex flex-col justify-between'
				>
					<div className='p-2 flex text-gray-500 text-[18px] border-b'>
						Добавить таску
					</div>
					<div className='flex flex-col gap-5 m-3'>
						<Input
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
			</div>
		</div>
	)
}

export default ModalAddTodo

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface Props {
	children: React.ReactNode
	className?: string
	setActive: (arg: boolean) => void
}

const ModalWrap = ({ children, className, setActive }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)

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
					{ 'scale-100': isVisible, 'scale-90': !isVisible },
					className
				)}
			>
				{children}
			</div>
		</div>
	)
}

export default ModalWrap

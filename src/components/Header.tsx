import { Button } from './ui/button'

interface Props {
	setActive: (arg: boolean) => void
}

const Header = ({ setActive }: Props) => {
	return (
		<div className='flex items-center text-center justify-center space-x-5 p-3'>
			<a
				title='Посмотреть код'
				href='https://github.com/FrozenQxc/TodoList-React-Redux'
			>
				<img
					className='w-10 rounded-[50%] bg-white'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1280px-GitHub_Invertocat_Logo.svg.png'
					alt=''
				/>
			</a>
			<h1 className='text-white font-semibold text-[20px]'>
				TodoList React + Redux
			</h1>

			<div>
				<Button onClick={() => setActive(true)}>Добавить</Button>
			</div>
		</div>
	)
}

export default Header

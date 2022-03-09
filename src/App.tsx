import { FC, StrictMode } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Routes } from './Routes'

export const App: FC = () => {
	return (
		<>
			<StrictMode>
				<Router basename={process.env.PUBLIC_URL}>
					<nav className='tabs'>
						<NavLink exact activeClassName='active' to='/'>
							Email signature
						</NavLink>
						<NavLink activeClassName='active' to='/instructions'>
							Instructions
						</NavLink>
					</nav>
					<main className='container'>
						<Routes />
					</main>
					<Footer />
				</Router>
			</StrictMode>
		</>
	)
}

import { FC } from 'react'
import { SignatureCreatorForm } from './pages/SignatureCreatorForm'
import { Switch, Route } from 'react-router-dom'
import { Instructions } from './pages/Instructions'

export const Routes: FC = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<SignatureCreatorForm />
			</Route>
			<Route path='/instructions'>
				<Instructions />
			</Route>
		</Switch>
	)
}

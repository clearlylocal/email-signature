import React from 'react'
import ReactDOM from 'react-dom'
import 'chota/dist/chota.css' // can't use .min.css due to CRA transpiling bug
import './styles/index.css'
import { App } from './App'
import buildInfo from './buildInfo.json'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)

console.info(`Build ${buildInfo.hash}\n${buildInfo.ts}`)

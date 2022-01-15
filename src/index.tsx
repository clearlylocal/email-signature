import React from 'react'
import ReactDOM from 'react-dom'
import 'chota/dist/chota.css' // can't use .min.css due to CRA transpiling bug
import './styles/index.css'
import { App } from './App'
import { joinPath } from './utils/path'

fetch(joinPath('build-timestamp.txt')).then(async (res) => {
	const ts = await res.text()

	console.info('App last built', new Date(Number(ts)))
})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)

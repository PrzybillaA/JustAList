import React from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
	render() {
		return <>
			<div className="header">
				<div className="topline">
					Made by Adrian Przybilla
				</div>
				<div className="welcome h1">
					Welcome to my Angular example
				</div>
			</div>

			<div className="content">
				Content
			</div >
		</>
	}

}

export default App;

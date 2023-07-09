import React from 'react';
import './App.scss';
import List from './list/List';

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
				<List></List>
			</div >
		</>
	}

}

export default App;

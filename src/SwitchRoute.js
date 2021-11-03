import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history'
import Home from './Home/Home';
import AddStudent from './AddStudent/AddStudent';
function SwitchRoute() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/add-student" component={AddStudent} />
			</Switch>
		</Router>
	)
}

export default SwitchRoute

import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Frontpage from './components/Frontpage.jsx'
import Poll from './components/Poll.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <React.Fragment>
                <div className="header"><h2><Link to="/">Planning Poker</Link></h2></div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" render={(props) => <Frontpage {...props} />} />
                        <Route exact path="/:id(\d+)" render={(props) => <Poll {...props} />} />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
)

render(
    (routes), document.getElementById('react-app')
)
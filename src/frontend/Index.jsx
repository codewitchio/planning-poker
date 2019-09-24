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
                <div className="header"><Link to="/">Planning Poker</Link></div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" render={(props) => <Frontpage {...props} />} />
                        <Route exact path="/:code(\d+)" render={(props) => <Poll {...props} />} />
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
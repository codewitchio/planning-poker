import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Frontpage from './components/Frontpage.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <React.Fragment>
                <div className="header"><span>Planning Poker</span></div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" render={(props) => <Frontpage {...props} />} />
                        
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
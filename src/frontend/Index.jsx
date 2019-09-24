import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        console.log('Index.jsx render')
        return (
            <div>
                Hello React World!
            </div>
        )
    }
}

const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
)

render(
    (routes), document.getElementById('page')
)
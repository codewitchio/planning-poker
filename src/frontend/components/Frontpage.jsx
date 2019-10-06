import React from 'react'
import { Link } from 'react-router-dom'

class Frontpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {code: '', name: ''}

        this.handleCodeInputChange = this.handleCodeInputChange.bind(this)
        this.handleNameInputChange = this.handleNameInputChange.bind(this)
        this.goToPoll = this.goToPoll.bind(this)
        this.createPoll = this.createPoll.bind(this)
    }

    handleCodeInputChange(event) {
        this.setState({code: event.target.value})
    }

    goToPoll(e) {
        e.preventDefault()
        this.props.history.push(this.state.code)
    }

    handleNameInputChange(event) {
        this.setState({name: event.target.value})
    }

    createPoll(e) {
        e.preventDefault()
        name = this.state.name.replace(/\//g, '')
        return fetch(encodeURI(`/api/poll/create/${name}`)).then((response) => {
            response.json().then((json) => {
                console.log('createPoll:', json)
                if(json.success) {
                    this.props.history.push('/' + json.data.poll_id)
                }
            })
        })
    }

    render () {
        // TODO: Add Enter click to submit
        return (
            <div className="frontpage">
                <div className="frontpage-intro">
                    <a href="https://en.wikipedia.org/wiki/Planning_poker">Planning poker</a> is a technique used when planning a project, designed to eliminate anchoring bias when estimating effort.
                    <br/>
                    <br/>
                    Use the fields below to join an existing poll or create a new one! There's also a <Link to="/1">demo poll</Link> available!
                </div>
                <form onSubmit={this.goToPoll} className="frontpage-existing-poll">
                    <div className="shadow inputbox">
                        <input type="number" value={this.state.code} onChange={this.handleCodeInputChange} placeholder="Enter a poll code"/>
                        <button type="submit">Go</button>
                    </div>
                </form>
                <br/>
                <form onSubmit={this.createPoll} className="frontpage-create-poll">
                    <div className="shadow inputbox">
                        <input type="text" value={this.state.name} onChange={this.handleNameInputChange} placeholder="Or create a new poll by entering a name" />
                        <button type="submit">Go</button>
                    </div>
                </form>
                <div className="frontpage-credits">
                    Author: <a href="https://github.com/Aryuko/">Hanna/Aryu</a>
                    <br/>
                    Code: <a href="https://github.com/Aryuko/planning-poker">GitHub</a>
                </div>
            </div>
        )
    }
}

export default Frontpage
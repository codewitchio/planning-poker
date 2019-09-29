import React from 'react'

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

    goToPoll() {
        this.props.history.push(this.state.code)
    }

    handleNameInputChange(event) {
        this.setState({name: event.target.value})
    }

    createPoll() {
        return fetch('/api/poll/create/' + this.state.name).then((response) => {
            response.json().then((json) => {
                if(json.success) {
                    console.log(`poll '${json.data.name}' with id ${json.data.poll_id} created`)
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
                    <a href="https://en.wikipedia.org/wiki/Planning_poker">Planning poker</a> is a technique used when planning, designed to eliminate anchoring bias. Use the fields below to join an existing poll or create a new one!
                </div>
                <div className="frontpage-existing-poll">
                    <div className="shadow inputbox">
                        <input type="number" value={this.state.code} onChange={this.handleCodeInputChange} placeholder="Enter a poll code"/>
                        <button onClick={this.goToPoll}>Go</button>
                    </div>
                </div>
                <br/>
                <div className="frontpage-create-poll">
                    <div className="shadow inputbox">
                        <input type="text" value={this.state.name} onChange={this.handleNameInputChange} placeholder="Or create a new poll by entering a name" />
                        <button onClick={this.createPoll}>Go</button>
                    </div>
                </div>
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
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
            <div clasname="frontpage">
                <div className="frontpage-existing-poll">
                    {/* <label className="code-label">Enter a poll code</label> */}
                    <div className="shadow inputbox">
                        <input type="number" value={this.state.code} onChange={this.handleCodeInputChange} placeholder="Enter a poll code"/>
                        <button onClick={this.goToPoll}>Go</button>
                    </div>
                </div>
                <br/>
                <div className="frontpage-create-poll">
                    {/* <label className="name-label">Or create a new poll by entering a name</label> */}
                    <div className="shadow inputbox">
                        <input type="text" value={this.state.name} onChange={this.handleNameInputChange} placeholder="Or create a new poll by entering a name" />
                        <button onClick={this.createPoll}>Go</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frontpage
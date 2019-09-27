import React from 'react'

import VoteSelector from './VoteSelector.jsx'
import VoteResults from './VoteResults.jsx'

var id
class Poll extends React.Component {
    constructor(props) {
        super(props)

        id = this.props.match.params.id

        this.state = {
            loading: true,
            error: false,
            reveal: false,
            myVote: false
        }

        this.getPoll()
        this.addVote = this.addVote.bind(this)
        this.deleteVote = this.deleteVote.bind(this)
        this.toggleReveal = this.toggleReveal.bind(this)
    }

    getPoll() {
        return fetch(`/api/poll/${id}`).then((response) => {
            response.json().then((json) => {
                if(json.success) {
                    console.log(json)
                    this.setState({
                        loading: false,
                        title: json.data.name,
                        votes: json.data.votes
                    })
                } else {
                    this.setState({loading: false, error: true})
                    console.log(json)
                }
            })
        })
    }

    addVote(value, name) {
        fetch(`/api/poll/vote/${id}/${value}/${name}`).then((response) => {
            response.json().then((json) => {
                if(json.success) {
                    console.log(json)
                    this.setState({myVote: {id: json.data.vote_id, value: value, name: name}})
                } else {
                    console.log(json)
                }
            })
        })
    }

    deleteVote(id) {
        fetch(`/api/poll/delete_vote/${id}`).then((response) => {
            response.json().then((json) => {
                if(json.success) {
                    console.log(json)
                    this.setState({myVote: false})
                } else {
                    console.log(json)
                }
            })
        })
    }

    toggleReveal() {
        this.setState({reveal: !this.state.reveal})
    }
    
    render () {
        if (this.state.loading) {
            return (
                <div className="poll">
                    <div className="poll-loading">Loading poll {id}...</div>
                </div>
            )
        } else if (this.state.error) {
            return (
                <div className="poll">
                    <div className="poll-error">Error fetching poll {id}, please make sure the link was entered correctly</div>
                </div>
            )
        } else {
            return (
                <div className="poll">
                    <div className="poll-header">
                        <button className="button" onClick={this.toggleReveal}>{this.state.reveal ? 'Hide' : 'Show'}</button>
                        <span className="poll-title"> {this.state.title}</span>
                        <button className="button">Copy Link</button> {/* TODO: Add functionality */}
                    </div>
                    <div className="poll-votes">
                        <VoteResults votes={this.state.votes} myVote={this.state.myVote} reveal={this.state.reveal}/>
                    </div>
                    <div className="poll-input">
                        <VoteSelector myVote={this.state.myVote} addVote={this.addVote} deleteVote={this.deleteVote} />
                    </div>
                </div>
            )
        }
    }
}

export default Poll
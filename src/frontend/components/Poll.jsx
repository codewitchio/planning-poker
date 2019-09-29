import React from 'react'

import VoteSelector from './VoteSelector.jsx'
import VoteResults from './VoteResults.jsx'

var id
var socket
class Poll extends React.Component {
    constructor(props) {
        super(props)

        id = this.props.match.params.id

        // Get info about your own vote status from from localstorage
        let myVote = window.localStorage.getItem('myVote-' + id) ? JSON.parse(window.localStorage.getItem('myVote-' + id)) : false
        this.state = {
            loading: true,
            error: false,
            reveal: false,
            myVote: myVote
        }

        this.getPoll()
        
        // Open persistent connection to server
        socket = io()
        socket.open()
        // Listens for vote additions to update result list
        socket.on('addVote', (data) => {
            if(data.poll_id == id) {
                let updatedVotes = this.state.votes.concat({
                    vote_id: data.vote_id,
                    value: data.value,
                    name: data.name
                })
                this.setState({
                    votes: updatedVotes
                })
            }
        })
        // Listens for vote deletions to update result list
        socket.on('deleteVote', (data) => {
            let updatedVotes = [...this.state.votes]
            let index = updatedVotes.findIndex((element) => { return element.vote_id == data.vote_id })
            if (index != -1) {
                updatedVotes.splice(index, 1)
                this.setState({votes: updatedVotes})
            }
        })

        this.addVote = this.addVote.bind(this)
        this.deleteVote = this.deleteVote.bind(this)
        this.toggleReveal = this.toggleReveal.bind(this)
    }

    componentWillUnmount() {
        // Close connection to server
        socket.close()
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
                    let myVote = {vote_id: json.data.vote_id, value: value, name: name}
                    this.setState({myVote: myVote})
                    window.localStorage.setItem('myVote-' + id, JSON.stringify(myVote))
                } else {
                    console.log(json)
                }
            })
        })
    }

    deleteVote(vote_id) {
        fetch(`/api/poll/delete_vote/${vote_id}`).then((response) => {
            response.json().then((json) => {
                if(json.success) {
                    console.log(json)
                    this.setState({myVote: false})
                    window.localStorage.removeItem('myVote-' + id)
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
                        <button className="button shadow" onClick={this.toggleReveal}>{this.state.reveal ? 'Hide' : 'Show'}</button>
                        <span className="poll-title"> {this.state.title}</span>
                        <button className="button shadow">Copy Link</button> {/* TODO: Add functionality */}
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
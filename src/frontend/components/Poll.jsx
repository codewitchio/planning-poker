import React from 'react'

import VoteSelector from './VoteSelector.jsx'

var id
class Poll extends React.Component {
    constructor(props) {
        super(props)

        id = this.props.match.params.id

        this.state = {
            loading: true,
            error: false,
            reveal: false,
            hasVoted: false
        }

        this.getPoll(id)
    }

    getPoll(id) {
        return fetch('/api/poll/' + id).then((response) => {
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
            let votes = []
            for(let v of this.state.votes) {
                votes.push(<li key={v.vote_id}>{v.value}</li>)
            }
            return (
                <div className="poll">
                    <div className="poll-header">
                        
                        <h3 className="poll-title"> {this.state.title} <span className="subtitle">({id})</span></h3>
                    </div>
                    <div className="poll-votes">
                        <ul>
                            {votes}
                        </ul>
                    </div>
                    <div className="poll-input">
                        <h3>Add vote</h3>
                        <VoteSelector hasVoted={this.state.hasVoted} />
                    </div>
                </div>
            )
        }
    }
}

export default Poll
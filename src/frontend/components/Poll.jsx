import React from 'react'

var id
class Poll extends React.Component {
    constructor(props) {
        super(props)

        id = this.props.match.params.id

        this.state = {loading: true, reveal: false}
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
                    // Print some error
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
        } else {
            let votes = []
            for(let v of this.state.votes) {
                votes.push(<li>{v.value}</li>)
            }
            return (
                <div className="poll">
                    <div className="poll-header">
                        <span className="poll-id">Poll {id}</span>
                        <span className="poll-title"> {this.state.title}</span>
                    </div>
                    <div className="poll-votes">
                        Poll votes go here
                        <ul>
                            {votes}
                        </ul>
                    </div>
                    <div className="poll-input">
                        Poll entry goes here
                    </div>
                </div>
            )
        }
    }
}

export default Poll
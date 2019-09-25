import React from 'react'

var code
class Poll extends React.Component {
    constructor(props) {
        super(props)

        code = this.props.match.params.code
    }
    
    render () {
        return (
            <div className="poll">
                <div className="poll-header">
                    <span className="poll-id">Poll {code}</span>
                    <span className="poll-title">Poll title goes here</span>
                </div>
                <div className="poll-results">
                    Poll results go here
                </div>
                <div className="poll-input">
                    Poll entry goes here
                </div>
            </div>
        )
    }
}

export default Poll
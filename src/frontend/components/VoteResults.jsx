import React from 'react'

class VoteResults extends React.Component {
    constructor(props) {
        super(props)
    }

    buildCard (vote) {
        let secondClass = (this.props.myVote === false ? '' :( this.props.myVote.vote_id == vote.vote_id ? 'highlight' : ''))
        return (
            <div className="voteresults-cardcombo" key={"resultcard-" + vote.vote_id}>
                <div className={`card shadow ${secondClass}`}>
                    <span>{this.props.reveal ? vote.value : '?'}</span>
                </div>
                <span>{vote.name}</span>
            </div>
        )
    }

    render () {
        let cards = []
        for(let v of this.props.votes) {
            cards.push(this.buildCard(v))
        }
        return (
            <div className="voteresults-cardcontainer">
                {cards}
            </div>
        )
    }
}

export default VoteResults
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
        let sum = 0
        let cards = []
        for(let v of this.props.votes) {
            cards.push(this.buildCard(v))
            sum += v.value
        }
        
        let numOfCards = Object.keys(this.props.votes).length
        let average = sum / numOfCards
        return (
            <React.Fragment>
                <div className="voteresults-cardcontainer">
                    {cards}
                </div>
                <div className="voteresults-stats">
                    Votes: {numOfCards}
                    <br/>
                    Average: {this.props.reveal ? average.toFixed(2) : '?'}
                </div>
            </React.Fragment>
        )
    }
}

export default VoteResults
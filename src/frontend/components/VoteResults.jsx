import React from 'react'

class VoteResults extends React.Component {
    constructor(props) {
        super(props)
    }

    buildCard (vote) {
        let highlight = (this.props.myVote === false ? '' :( this.props.myVote.vote_id == vote.vote_id ? 'highlight' : ''))
        let reveal = this.props.reveal ? 'reveal' : ''
        return (
            <div className="voteresults-cardcombo" key={"resultcard-" + vote.vote_id}>
                <div className={`voteresults-flipcontainer ${reveal}`}>
                    <div className={`voteresults-cardfront card shadow ${highlight}`}>
                        <span>{'?'}</span>
                    </div>
                    <div className={`voteresults-cardback card shadow ${highlight}`}>
                        <span>{vote.value}</span>
                    </div>
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
                {
                    numOfCards > 0 ? (
                        <div className="voteresults-stats">
                            Votes: {numOfCards}
                            <br/>
                            Average: {this.props.reveal ? average.toFixed(2) : '?'}
                        </div>
                    ) : 
                    <div className="voteresults-stats">
                        No votes on this poll yet
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default VoteResults
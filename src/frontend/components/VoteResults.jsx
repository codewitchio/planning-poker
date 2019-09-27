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
                    <span>{vote.value}</span>
                </div>
                <span>{vote.name}</span>
            </div>
        )
    }

    render () {
        if(this.props.reveal) {
            let cards = []
            for(let v of this.props.votes) {
                cards.push(this.buildCard(v))
            }
            return (
                <div className="voteresults-cardcontainer">
                    {cards}
                </div>
            )
        } else {
            return (
                <div className="voteresults-cardcontainer">
                    {this.buildCard({
                        id: -1,
                        value: '?',
                        name: `${Object.keys(this.props.votes).length} hidden votes`
                    })}
                </div>
            )
        }
    }
}

export default VoteResults
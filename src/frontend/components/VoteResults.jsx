import React from 'react'

class VoteResults extends React.Component {
    constructor(props) {
        super(props)
    }

    buildCard (vote) {
        // TODO: Add highlight on id = myVote.id
        // let secondClass = (value === this.state.valueSelected ? 'highlight' : this.state.valueSelected == false ? '' : 'dim')
        let secondClass = ''
        return (
            <div className="voteresults-cardcombo">
                <div className={`card shadow ${secondClass}`} key={"resultcard-" + vote.value}>
                    <span>{vote.value}</span>
                </div>
                <span>{vote.name}</span>
            </div>
        )
    }

    render () {
        let cards = []
        for(let v of this.props.votes) {
            cards.push(this.buildCard(v))
            // cards.push(<div key={`votecard-{v.vote_id}`}>{v.value}</div>)
        }
        return (
            <div className="voteresults-cardcontainer">
                {cards}
            </div>
        )
    }
}

export default VoteResults
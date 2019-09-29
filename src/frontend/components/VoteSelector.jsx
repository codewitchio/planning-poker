import React from 'react'

var voteOptions = [0, 1, 2, 3, 5, 8, 13, 20]
class VoteSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            valueSelected: false,
            nameInput: ''
        }

        this.handleCardClick = this.handleCardClick.bind(this)
        this.handleNameInputChange = this.handleNameInputChange.bind(this)
        this.goClick = this.goClick.bind(this)
        this.retractVote = this.retractVote.bind(this)
    }

    handleCardClick(value) {
        if (this.state.valueSelected === value) {
            this.setState({valueSelected: false})
        } else {
            this.setState({valueSelected: value})
        }
    }
    handleNameInputChange(event) {
        this.setState({nameInput: event.target.value})
    }
    goClick() {
        this.props.addVote(this.state.valueSelected, this.state.nameInput)
    }
    retractVote() {
        this.props.deleteVote(this.props.myVote.vote_id)
    }

    buildCard (value) {
        let secondClass = (value === this.state.valueSelected ? 'highlight' : this.state.valueSelected == false ? '' : 'dim')
        return (
            <div className={`voteselector-votecard card shadow ${secondClass}`} key={"votecard-" + value} onClick={ () => this.handleCardClick(value)}>
                <span>{value}</span>
            </div>
        )
    }

    render () {
        if (this.props.myVote != false) { // User has already voted
            return (
                <React.Fragment>
                    <h3>Vote successful!</h3>
                    <label>You voted: {this.props.myVote.value}</label>
                    <button className="button shadow" onClick={this.retractVote}>Retract vote</button>
                </React.Fragment>
            )
        } else {
            let cards = []
            for(let value of voteOptions) {
                cards.push(this.buildCard(value))
            }
            let disabled = (!this.state.nameInput || this.state.valueSelected === false)
            return (
                <React.Fragment>
                    <h3>Add vote</h3>
                    <div className="voteselector-cardcontainer">
                        {cards}
                    </div>
                    <div className="voteselector-input">
                        <div className="shadow inputbox">
                            <input type="text" value={this.state.nameInput} onChange={this.handleNameInputChange} placeholder="Enter your name" />
                            <button onClick={this.goClick} disabled={disabled}>Go</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default VoteSelector
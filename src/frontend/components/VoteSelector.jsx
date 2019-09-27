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

    buildCard (value) {
        let secondClass = (value === this.state.valueSelected ? 'highlight' : this.state.valueSelected == false ? '' : 'dim')
        return (
            <div className={`voteselector-votecard shadow ${secondClass}`} key={"votecard-" + value} onClick={ () => this.handleCardClick(value)}>
                <span>{value}</span>
            </div>
        )
    }

    render () {
        let cards = []
        for(let value of voteOptions) {
            cards.push(this.buildCard(value))
        }
        let disabled = (!this.state.nameInput || this.state.valueSelected === false)
        return (
            <React.Fragment>
                <div className="voteselector-cardcontainer">
                    {cards}
                </div>
                <div className="voteselector-input">
                    <label>Enter your name</label>
                    <input type="text" value={this.state.nameInput} onChange={this.handleNameInputChange} />
                    <button onClick={this.goClick} disabled={disabled}>Go</button>
                </div>
            </React.Fragment>
        )
    }
}

export default VoteSelector
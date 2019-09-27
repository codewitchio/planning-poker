import React from 'react'

var voteOptions = [0, 1, 2, 3, 5, 8, 13, 20]
class VoteSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            valueSelected: false
        }

        this.handleCardClick = this.handleCardClick.bind(this)
        this.handleNameInputChange = this.handleNameInputChange.bind(this)
    }

    handleCardClick (value) {
        if (this.state.valueSelected === value) {
            this.setState({valueSelected: false})
        } else {
            this.setState({valueSelected: value})
        }
    }
    handleNameInputChange (event) {

    }

    buildCard (value) {
        let secondClass = (value === this.state.valueSelected ? 'highlight' : this.state.valueSelected == false ? '' : 'dim')
        return (
            <div className={`voteselector-votecard ${secondClass}`} key={"votecard-" + value} onClick={ () => this.handleCardClick(value)}>
                <span>{value}</span>
            </div>
        )
    }

    render () {
        let cards = []
        for(let value of voteOptions) {
            cards.push(this.buildCard(value))
        }
        return (
            <React.Fragment>
                <div className="voteselector-cardcontainer">
                    {cards}
                </div>
                <div className="voteselector-input">
                    <label>Enter your name</label>
                    <input type="text" value={this.state.nameInput} onChange={this.handleNameInputChange} />
                </div>
            </React.Fragment>
        )
    }
}

export default VoteSelector
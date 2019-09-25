import React from 'react'

class Frontpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {inputValue: ''}

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)
    }

    handleInputChange(event) {
        this.setState({inputValue: event.target.value})
    }

    handleGoClick() {
        this.props.history.push(this.state.inputValue)
    }

    render () {
        return (
            <div clasname="frontpage">
                <label className="code-label">Enter a poll code</label>
                <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} />
                <button onClick={this.handleGoClick}>Go</button>
            </div>
        )
    }
}

export default Frontpage
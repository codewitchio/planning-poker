import React from 'react'

var code
class Poll extends React.Component {
    constructor(props) {
        super(props)

        code = this.props.match.params.code
    }
    
    render () {
        return (
            <div>
                Poll #{code}
            </div>
        )
    }
}

export default Poll
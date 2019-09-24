import React from 'react'

class Frontpage extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <label className="code-label">Enter a poll code</label>
                <input type="text" />
                <button>Go</button>
            </div>
        )
    }
}

export default Frontpage
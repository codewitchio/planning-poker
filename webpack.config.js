const path = require('path')

let config = {
    entry: {
        react: path.resolve('./src/frontend/Index.jsx')
    },
    output: {
        path: path.resolve('./public'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /.((js)|jsx)?$/,
                use: 'babel-loader'
            }
        ]
    }
}

module.exports = config
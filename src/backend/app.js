/** 
 * Project:     planning-poker
 * Repository:  https://github.com/Aryuko/planning-poker/
 * Author:      Aryuko
 * Version:     0.0.1
*/

const path      = require('path')
const express	= require('express')
const app		= express()
const http      = require('http').createServer(app);

const port      = 3000

const Database = require('./database.js')
const db = new Database()

const publicPath = path.join(__dirname, '../../public')

app.use(express.static(publicPath))
app.get('/api/poll/create/:name', (req, res) => {
    db.createPoll(req.params.name, (data) => {
        dbResponse(data, res)
    })
})
app.get('/api/poll/:id', (req, res) => {
    db.getPoll(req.params.id, (data) => {
        dbResponse(data, res)
    })

})
app.get('/api/poll/vote/:poll_id/:value', (req, res) => {
    db.addVote(req.params.poll_id, req.params.value, (data) => {
        dbResponse(data, res)
    })
})
app.get('/api/*', (req, res) => { res.send('Invalid endpoint') })
app.get('*', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
http.listen(port, () => console.log('listening on port', port))

function dbResponse(data, res) {
    if (data) {
        res.send({
            success: true,
            errormessage: false,
            data: data
        })
    } else {
        res.send({
            success: false,
            errormessage: 'error reading from database',
            data: {}
        })
    }
}
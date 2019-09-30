/** 
 * Project:     planning-poker
 * Repository:  https://github.com/Aryuko/planning-poker/
 * Author:      Aryuko
 * Version:     0.0.1
*/

const path      = require('path')
const express	= require('express')
const app		= express()
const http      = require('http').createServer(app)
const io        = require('socket.io')(http)

const port      = 3000

const Database = require('./database.js')
const db = new Database()

const publicPath = path.join(__dirname, '../../public')
app.use(express.static(publicPath))

/* Register API endpoints */
app.get('/api/poll/create/:name', (req, res) => {
    db.createPoll(req.params.name, (data) => {
        APIResponse(data, res)
    })
})
app.get('/api/poll/:id', (req, res) => {
    db.getPoll(req.params.id, (data) => {
        APIResponse(data, res)
    })

})
app.get('/api/poll/vote/:poll_id/:value/:name', (req, res) => {
    db.addVote(req.params.poll_id, req.params.value, req.params.name, (data) => {
        APIResponse(data, res)
        if(data) {io.emit('addVote', data)} // Emit addVote event to connected clients
    })
})
app.get('/api/poll/delete_vote/:vote_id', (req, res) => {
    db.deleteVote(req.params.vote_id, (data) => {
        APIResponse(data, res)
        if(data) {io.emit('deleteVote', data)} // Emit deleteVote event to connected clients
    })
})
app.get('/api/*', (req, res) => { res.send('Invalid endpoint') })

/* Let the React app take care of all other routing */
app.get('*', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
http.listen(port, () => console.log('listening on port', port))

/* Keep track of connected clients */
var clientCount = 0
io.on('connection', (socket) => {
    console.log(`Client connected, serving ${++clientCount} total connection(s)`)
    socket.on('disconnect', () => { console.log(`Client disconnected, serving ${--clientCount} total connection(s)`) })
})

/* Response template for API calls */
function APIResponse(data, res) {
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
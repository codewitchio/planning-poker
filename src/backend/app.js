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
app.get('/api/poll/create/:name?', (req, res) => {
    if(req.params.name) {
        db.createPoll(req.params.name, (data) => {
            if (data) {
                res.send({
                    success: true,
                    errormessage: false,
                    data: data
                })
            } else {
                res.send({
                    success: false,
                    errormessage: 'error',
                    data: {}
                })
            }
        })
    } else {
        res.send({
            success: false,
            errormessage: 'Missing name parameter',
            data: false
        })
    }
})
app.get('/api/poll/:id?', (req, res) => {
    if(req.params.id) {
        // Get from database
        db.getPoll(req.params.id, (data) => {
            if (data) {
                res.send({
                    success: true,
                    errormessage: false,
                    data: data
                })
            } else {
                res.send({
                    success: false,
                    errormessage: 'invalid poll id',
                    data: {}
                })
            }
        })
    } else {
        res.send({
            success: false,
            errormessage: 'Missing ID parameter',
            data: false
        })
    }

})
app.get('*', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
http.listen(port, () => console.log('listening on port', port))
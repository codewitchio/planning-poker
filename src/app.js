/** 
 * Project:     planning-poker
 * Repository:  https://github.com/Aryuko/planning-poker/
 * Author:      Aryuko
 * Version:     0.0.1
*/

const express	= require('express')
const app		= express()
const http      = require('http').createServer(app);

const port      = 3000
const debug     = true

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'))
http.listen(port, () => console.log('listening on', port))
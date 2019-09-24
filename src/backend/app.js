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
const debug     = true

const publicPath = path.join(__dirname, '../../public')

app.use(express.static(publicPath))
app.get('/', (req, res) => res.sendFile(path.join(publicPath, '/index.html')))
http.listen(port, () => console.log('listening on port', port))
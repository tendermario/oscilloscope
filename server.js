var express = require('express')
var app = express()

var port = 3001;

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(port, function () {
    console.log(`Three.js app listening on port ${port}`)
})

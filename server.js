var path = require('path')
var moby = require('./')
var express = require('express')
var app = module.exports = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', express.static('public'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.send({
    ok: 'ok'
  })
})

app.get('/healthz', function (req, res) {
  res.send({
    ok: 'ok'
  })
})

app.get('/q', function (req, res) {
  res.send({
    searchResults: moby.search(req.query.q),
    reverseSearchResults: moby.reverseSearch(req.query.q)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), function () {
    console.log('Moby is running at localhost:' + app.get('port'))
  })
}

const express = require('express')

// where should this go
// Access-Control-Allow-Origin: *

const sendEvent = (res, data) => res.write(`data: ${data.toString()}\n\n`)
const getEmoji = (number) => {
  const emojis = [
    '\u{1F984}',
    '\u{269B}',
    '\u{1F52B}'
  ]
  return emojis[number % emojis.length]
}
function handler (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/event-stream' })

  sendEvent(res, 'foo')
  const interval = setInterval(() => sendEvent(res, getEmoji(Math.floor(Math.random() * 100))), 1000)

  req.on('close', () => {
    clearInterval(interval)
    res.end()
  })
}

const app = express()
app.disable('x-powered-by')
// app.all('/', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
// app.get('http://localhost:3000/', handler)

app.use(express.static('public'))
app.get('/sse', handler)
app.listen(8080)

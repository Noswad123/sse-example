const express = require('express')
const app = express()
const port = 3000

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  console.log(req)
  next()
})
app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

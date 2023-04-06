
const express = require('express')
const conectToMongo=require('./db');
var cors = require('cors')
conectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


//Availble routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
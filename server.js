const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express()

mongoose.set('useFindAndModify', false)

// 引入routes
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

// DB config
const db = require('./config/keys').mongoURI

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect to mongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log(err))

// passport 初始化
app.use(passport.initialize())

require('./config/passport')(passport)
// app.get("/", (req, res) => {
//   res.send('hello')
// })

// 使用routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const port = process.env.PROT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
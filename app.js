// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入 mongoose

const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
MONGODB_URI = "mongodb+srv://alpha:<camp>@cluster0.iw3ts.mongodb.net/test?retryWrites=true&w=majority"
app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入 mongoose

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const Todo = require('./models/todo')

const routes = require('./routes')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
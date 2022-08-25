const express = require('express')

const router = express.Router()
const Todo = require('../../models/todo')

//add a new Todolist 
router.get('/new', (req, res) => {
  return res.render('new')
})

//create and back to the homepage
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name

  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show the Todolist's detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//edit the Todolist
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//check button and save the Todolist
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//delete a Todolist
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
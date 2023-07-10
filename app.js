const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const todo = require("./todoSchema")

const port = 3000
const app = express()

app.use(bodyParser.json())

run().catch((err) => console.log(err))

async function run() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/TODO", console.log("Everything running smoothly, proceed to next task"))
    } catch (err) {
      console.log(" db connection failed" + err)
    }
}

app.get('/', (req, res) => {
  todo.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.get('/:id', (req, res) => {
  todo.findById(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('ID not found')
      }
      res.status(200).send(todo)
    })
    .catch((error) => {
      res.status(500).send(error)
    });
});

app.post('/', (req, res) => {
  todo.create(req.body)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.put('/:id', (req, res) => {
  todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('ID not found')
      }
      res.status(200).send(todo)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.delete('/:id', (req, res) => {
  todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('ID not found')
      }
      res.status(200).send('ToDo deleted')
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.listen(port, () => console.log("Server running on port " + port))

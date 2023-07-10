const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  todo: String,
  status: String,
})

module.exports = mongoose.model("todo", todoSchema)

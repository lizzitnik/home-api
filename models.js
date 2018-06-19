const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
})

const TodoSchema = mongoose.Schema({
  value: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    todos: this.todos
  }
}

TodoSchema.methods.serialize = function() {
  return {
    id: this._id,
    value: this.value,
    completed: this.completed
  }
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 6)
}

const User = mongoose.model("User", UserSchema)
const Todo = mongoose.model("Todo", TodoSchema)

module.exports = {
  User,
  Todo
}

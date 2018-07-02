'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require("jsonwebtoken")
const { app, runServer, closeServer } = require('../server');
const { User, Todo } = require('../models');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Todo endpoints', function () {
  const username = "exampleUser"
  const password = "examplePass"
  const firstName = "Example"
  const lastName = "User"

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        lastName
      })
    )
  })

  afterEach(function() {
    return User.remove({})
  })

  describe('/todos', function () {
    describe('GET', function () {
      it("should return all existing todos", function() {
        let res
        let token
        User.findOne()
          .then(user => {
            token = jwt.sign({
                user: user.serialize()
              },
              JWT_SECRET, {
                algorithm: "HS256",
                subject: username,
                expiresIn: "7d"
              }
            )
          })
          .then(() => {
            return chai
              .request(app)
              .get("/todos")
              .set("authorization", `jwt ${token}`)
              .then(function(_res) {
                res = _res
                expect(res).to.have.status(200)
              })
          })
          .catch(err => {
            console.error(err)
          })
        })
      })

    describe('POST', function () {
      it("should add a new todo", function() {
        let newTodo
        let token
        User.findOne()
          .then(user => {
            token = jwt.sign({
                user: user.serialize()
              },
              JWT_SECRET, {
                algorithm: "HS256",
                subject: username,
                expiresIn: "7d"
              }
            )
          })
          .then(user => {
            newTodo = {
              value: "Walk Dog",
              completed: false
            }
          })
          .then(() => {
            return chai
              .request(app)
              .post("/todos")
              .send(newTodo)
              .set("authorization", `jwt ${token}`)
              .then(function(res) {
                expect(res).to.have.status(201)
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys(
                  'id', 'value', 'completed');
                expect(res.body.value).to.equal(newDog.value);
                expect(res.body.id).to.not.be.null;
                expect(res.body.completed).to.equal(newDog.completed);
              })
          })
          .catch(err => {
            console.error(err)
          })
        })
    })

    describe("PUT", function() {
      before(function() {
        Todo.create({
          value: "Find Cheese",
          completed: false
        })
      })
      it("should update todo on PUT", function() {
        const updateData = {
          completed: true
        }

        return Todo.findOne()
          .then(function(todo) {
            updateData.id = todo.id
            return chai
              .request(app)
              .put(`/todos/${todo.id}`)
              .send(updateData)
          })
          .then(function(res) {
            expect(res).to.have.status(201)
            expect(res.body.completed).to.equal(true)
          })
          .catch(err => {
            console.error(err)
          })
      })
    })

    describe("DELETE", function() {
      it("should delete a todo by id", function() {
        let todo
        let token
        User.findOne()
          .then(user => {
            token = jwt.sign({
                user: user.serialize()
              },
              JWT_SECRET, {
                algorithm: "HS256",
                subject: username,
                expiresIn: "7d"
              }
            )
          })
          .then(() => {
            return Todo.findOne()
              .set("authorization", `jwt ${token}`)
              .then(function(_todo) {
                todo = _todo
                return chai.request(app).delete(`/todos/${todo.id}`)
              })
              .then(function(res) {
                expect(res).to.have.status(204)
                expect(res.body).to.be.empty;
              })
          })
          .catch(err => {
            console.error(err)
          })
      })
    })

  })
})

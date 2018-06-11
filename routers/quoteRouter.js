const express = require("express")
const axios = require("axios")
const router = express.Router()


router.get('/', (req, res, next) => {
  const QUOTES_URL = 'https://random-quote-generator.herokuapp.com/api/quotes/random'
  axios(`${QUOTES_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(data => {
    console.log(data.data)
    res.send(JSON.stringify(data.data))
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: err
    })
  })
})

module.exports = router

const express = require("express")
const axios = require("axios")
const router = express.Router()

const API_KEY = "ceed6174e9f6810403c268bc00473430"

// const fetchWeather = (res, key) => {
//   const WEATHER_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${APIKEY}`
//   axios(`${WEATHER_URL}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(data => {
//       res.json(data.data)
//     })
//     .catch(err => {
//     })
// }

router.get("/location/:lat/:lng", (req, res, next) => {
  const { lat, lng } = req.params
  const WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`
  axios(`${WEATHER_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => {
      res.json(data.data)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router

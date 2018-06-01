const express = require("express")
const axios = require("axios")
const router = express.Router()

const APIKEY = "LAq9F4q81rIdNHqJragJjf1GJQho8GlI"

const fetchWeather = (res, key) => {
  const WEATHER_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${APIKEY}`
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
      debugger
    })
}

router.get("/location/:lat/:lng", (req, res, next) => {
  const { lat, lng } = req.params
  const LOCATION_URL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${lat},${lng}&apikey=${APIKEY}`
  axios(`${LOCATION_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.data.Key
    })
    .then(key => {
      fetchWeather(res, key)
    })
})

module.exports = router

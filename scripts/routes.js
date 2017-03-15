'use strict'
const { lines } = require('../js-feed/data')

const routes = []
const trips = []

Object.keys(lines).forEach((key) => {
  const route = lines[key]
  routes.push({
    route_id: route.id,
    agency_id: 1,
    route_short_name: route.key,
    route_long_name: route.name,
    route_desc: '',
    route_type: 3,
    route_url: route.pdf,
    route_color: route.color
  })

  Object.keys(route.directions).forEach((key) => {
    const trip = route.directions[key]
    trips.push({
      route_id: route.key,
      service_id: 'TODO',
      trip_id: trip.id,
      trip_headsign: trip.name
    })
  })
})

console.log(routes)
console.log(trips)

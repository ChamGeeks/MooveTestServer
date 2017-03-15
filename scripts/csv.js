'use strict'

const fs = require('fs')
const path = require('path')
const stops = require('./busstops')
const filePath = (p) => path.resolve(__dirname, p)


fs.readFile(filePath('../csv/night-down.csv'), 'utf8', (err, file) => {
  if (err) return console.error(err)

  const rows = file.trim().split(/\r?\n/)
  const table = rows.map((r) => r.split(','))
  const stopsNames = table.shift()

  const stopTimes = []
  for (let i = 0; i < stopsNames.length; i++) {
    const name = stopsNames[i]
    const stop = Object.assign({},
      stops.find((s) => name === s.name || s.alias && s.alias.includes(name))
    )
    if (!stop) {
      console.error(name)
      continue
    }

    stop.times = []

    for (const time of table) {
      // console.log(time)
      stop.times.push(time[i])
    }
    stopTimes.push(stop)
  }

  console.log(stopTimes)
})

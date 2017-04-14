var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const routes = await txtToJson(path.resolve(__dirname, '../sample-feed/routes.txt'));
  res.render('index', { title: 'Chamoove API Server - CHAPIS', routes });
});

const files = fs.readdirSync(path.resolve(__dirname, '../sample-feed/'));
for (file of files) {
  router.get('/' + file, async function(req, res, next) {
    const stops = await txtToJson(path.resolve(__dirname, '../sample-feed/', file));
    res.json(stops);
  });
}

router.get('/stops', async function(req, res, next) {
  const stops = await txtToJson(path.resolve(__dirname, '../sample-feed/stops.txt'));
  res.json(stops);
});


function txtToJson(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) reject(err);

      const rows = file.split(/\r?\n/);
      const table = rows.map((r) => r.split(','));
      const fields = table.shift();

      const items = table.map((columns) => {
        const item = {};
        for (let i = 0; i < columns.length; i++) {
          item[fields[i]] = columns[i];
        }
        return item;
      })
      resolve(items);
    });
  })
}


module.exports = router;

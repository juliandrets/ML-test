const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get search
app.post('/api/search/:search', (req, res, next) => {
  var Request = require("request");
  var search = req.params.search;

  Request.post({
      "headers": { "content-type": "application/json" },
      "url": "https://api.mercadolibre.com/sites/MLA/search?q=" + search + "&limit=6",
      "body": JSON.stringify({})
  }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      var items = JSON.parse(body);
      res.send(items.results)
  });
});

// get product
app.get('/api/items/:id', (req, res, next) => {
  var request = require("request");
  var search = req.params.id;

  request('https://api.mercadolibre.com/items/' + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var items = JSON.parse(body);
      res.send(items)
    }
  });
});

// get description of product
app.get('/api/items/:id/description', (req, res, next) => {
  var request = require("request");
  var search = req.params.id;

  request('https://api.mercadolibre.com/items/' + search + '/description', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var items = JSON.parse(body);
      res.send(items)
    }
  });
});

// get category for breadcrumbs
app.get('/api/categories/:id', (req, res, next) => {
  var request = require("request");
  var search = req.params.id;
  
  request('https://api.mercadolibre.com/categories/' + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var items = JSON.parse(body);
      res.send(items)
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

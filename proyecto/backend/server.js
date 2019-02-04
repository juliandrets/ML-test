const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*********************************************
-----------------ROUTES----------------------
*********************************************/

const request = require("request");
let search;
let searchResponse;

// Get search
app.get('/api/search/:search', (req, res, next) => {
  search = req.params.search;

  request.post({
      "headers": { "content-type": "application/json" },
      "url": "https://api.mercadolibre.com/sites/MLA/search?q=" + search + "&limit=4",
      "body": JSON.stringify({})
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        searchResponse = JSON.parse(body);
        res.send(searchResponse)
  });
});

// Get pictures
app.get('/api/pictures/:id', (req, res, next) => {
  search = req.params.id;

  request('https://api.mercadolibre.com/items/?ids=' + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      searchResponse = JSON.parse(body);
      res.send(searchResponse)
    }
  });
});

// Get only item
app.get('/api/items/:id', (req, res, next) => {
  search = req.params.id;

  request('https://api.mercadolibre.com/items/' + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      searchResponse = JSON.parse(body);
      res.send(searchResponse)
    }
  });
});

// Get item description
app.get('/api/items/:id/description', (req, res, next) => {
  search = req.params.id;

  request('https://api.mercadolibre.com/items/' + search + '/description', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      searchResponse = JSON.parse(body);
      res.send(searchResponse)
    }
  });
});

// Get categories for breadcrumbs
app.get('/api/categories/:id', (req, res, next) => {
  search = req.params.id;

  request('https://api.mercadolibre.com/categories/' + search, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      searchResponse = JSON.parse(body);
      res.send(searchResponse)
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

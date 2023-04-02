require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const urls = {

}

app.post("/api/shorturl", (req, res) => {
  const original = req.body.url;


  if (original.includes("https://") || original.includes("http://")) {
    const alias = Object.keys(urls).length + 1;
    urls[`${alias}`] = req.body.url;
    console.log(alias, original, urls)
    res.send({ original_url: req.body.url, short_url: alias })
  }

  else {
    res.send({ error: 'invalid url' })
  }
})
app.get("/api/shorturl/:url1", (req, res) => {
  const url = urls[req.params.url1]
  res.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

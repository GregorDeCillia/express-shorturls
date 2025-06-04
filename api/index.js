const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://www.freecodecamp.org' }));

const urls = [];
const addUrl = url => urls.push(url) - 1;

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express on Vercel!' });
});

app.post('/api/shorturl', (req, res) => {
    const url = req.body.url;
    if (! /^http/.test(url)) {
        res.status(400).json({ error: 'invalid url' })
    } else {
        res.status(201).json({ original_url: url, short_url: addUrl(url) })
    }
})

app.get('/api/shorturl/:id', (req, res) => {
    const id = Number(req.params.id)
    const url = urls[id];
    if (url) {
        res.status(302).redirect(url)
    } else {
        res.status(400).json({ error: 'invalid short url' })
    }
})

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
})

app.use(express.static('public'));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
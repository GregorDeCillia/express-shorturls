const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://www.freecodecamp.org' }));

const urls = [];
const addUrl = url => urls.push(url) - 1;
const isValidUrl = url => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);

app.post('/api/shorturl', (req, res) => {
    const url = req.body.url;
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'invalid url' });
    }
    res.status(201).json({ original_url: url, short_url: addUrl(url) })
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

app.get("/", (_req, res) =>
    res.sendFile(process.cwd() + '/index.html'));

app.get("/style.css", (_req, res) =>
    res.sendFile(process.cwd() + '/style.css'));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
const express = require('express');
const path = require('path');
const logger = require('../customEvents/logger');

let songs = require('../data/songs')

const router = express.Router();


router.get('/api/songs', (req, res) => {
  logger.emit('log', req);
  res.status(200).json(songs)
})


router.get('/api/songs/:id', (req, res) => {
  const song = songs.filter((s) => s.id == req.params.id)
  if (song.length == 0)
    res.status(404).json({ "error": "Song not found..." })
  res.status(200).json(song)
})


router.post('/api/songs', (req, res) => {
  const song = req.body
  songs.push(song)
  res.status(200).send()
})

router.put('/api/songs/:id', (req, res) => {
  const song = songs.find(song => song.id == req.params.id)

  if (!song)
    return res.status(404).json({ "error": "Song not found..." })

  // song.title = req.body.title
  // song.artist = req.body.artist
  // song.rating = req.body.rating
  Object.assign(song, req.body)

  res.status(200).send()
})

router.patch('/api/songs/:id', (req, res) => {
  const song = songs.find(song => song.id == req.params.id)

  if (!song)
    return res.status(404).json({ "error": "Song not found..." })

  Object.assign(song, req.body)

  res.status(200).send()
})


router.delete('/api/songs/:id', (req, res) => {
  // be careful about parameters type
  // // or parseInt(req.params.id) if integer to use !==
  songs = songs.filter(song => song.id != req.params.id)
  res.status(200).send()
})

// for all http methods get, post, put, patch, head, options, delete
router.all('/*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Page not Found...' })
  } else {
    res.type('txt').send('404 Page not Found...')
  }
});



module.exports = router;
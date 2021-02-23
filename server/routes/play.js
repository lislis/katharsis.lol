require('dotenv').config()
const express = require('express');
const router = express.Router()
const Play = require('../models/Play.js');
const puppeteer = require("puppeteer");


router.get('/pdf/:playid', async (req, res, next) => {
  const id = req.params.playid;

  Play.findById(id, async (err, play) => {
    if (err) return next(err);

    const url = `${process.env['UI']}/play/${play._id}`
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulateMediaType('print');
    await page.goto(url, {
      waitUntil: "networkidle0"
    });
    const pdf = await page.pdf({
      printBackground: true,
      format: "A4",
      margin: {
        top: "20px",
        bottom: "20px",
        left: "10px",
        right: "10px"
    }});
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
  });
});

router.get('/', (req, res, next) => {
  Play.find((err, plays) => {
    if (err) return next(err);
    res.json(plays);
  });
});

router.get('/:id', (req, res, next) => {
  Play.findById(req.params.id, (err, play) => {
    if (err) return next(err);
    res.json(play);
  });
});

router.post('/', (req, res, next) => {
  Play.create(req.body, (err, play) => {
    if (err) return next(err);
    res.json(play);
  });
});

router.put('/:id', (req, res, next) => {
  Play.findByIdAndUpdate(req.params.id, req.body, (err, play) => {
    if (err) return next(err);
    res.json(play);
  });
});

router.delete('/:id', (req, res, next) => {
  Play.findByIdAndRemove(req.params.id, req.body, (err, play) => {
    if (err) return next(err);
    res.json(play);
  });
});

module.exports = router;

const express = require('express');

const bot = require('../hrcx/bot')

const router = express.Router();

router.get('/start', (req, res) => {
    bot.start().then(() => {
        console.log(`[BOT] Discord instance started`);
        res.status(200).json({message: "Discord instance started", status: 200});
    }).catch((err) => {
        res.status(500).json({message: `Could not start discord instance: ${err}`, status: 500});
    });
});

router.get('/stop', (req, res) => {
    bot.stop().then(() => {
        console.log(`[BOT] Discord instance stopped`);
        res.status(200).json({message: "Discord instance stopped", status: 200});
    }).catch((err) => {
        res.status(500).json({message: `Could not stop discord instance: ${err}`, status: 500});
    });
});

router.get('/info', (req, res) => {
    res.status(200).json({message: "Informations about the current instance", status: 200, data: {online: bot.isRunning()}});
});

router.all('/*', (req, res) => res.status(404).json({message: "Page not found", status: 404}));

module.exports = router;
const express = require('express');

const bot = require('../hrcx/bot')

const router = express.Router();

router.get('/start', (req, res) => {
    
    res.status(200).json({status: "Started"});
});

router.get('/stop', (req, res) => {
    res.status(200).json({status: "stopped"});
});

router.get('/info', (req, res) => {
    res.status(200).json({info: "info"});
});

module.exports = router;
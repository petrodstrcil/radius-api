'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('YES Respond with a resource');
});

module.exports = router;

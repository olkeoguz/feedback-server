const express = require('express');
const pageController = require('../controllers/page-controller');

const router = express.Router();

router.get('/index', pageController.indexPage);
module.exports = router;

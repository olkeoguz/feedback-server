const express = require('express');
const feedbackController = require('../controllers/feedback-controller');

const router = express.Router();

router.post('/', feedbackController.postFeedback);

router.get('/get/', feedbackController.getFeedbacks);


module.exports = router;

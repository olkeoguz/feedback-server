const express = require('express');

const router = express.Router();

router.post('/', feedbackController.postFeedback);

module.exports = router;

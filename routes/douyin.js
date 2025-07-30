const express = require('express');
const router = express.Router();
const douyin_controller = require("../controllers/douyin_contorller");

router.post('/sign', douyin_controller.signature);

module.exports = router;
var express = require('express');
var router = express.Router();
const douyu_controller = require("../controllers/douyu_controller");

router.post('/sign', douyu_controller.sign);

module.exports = router;
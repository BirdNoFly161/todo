var express = require('express');
var router = express.Router();

var register_user = require('../controllers/register_user');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/' ,register_user);

module.exports = router;

var express = require('express');
var mongoose = require ('mongoose');
var Beer = require('./models/beer');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.get('/', function(req, res) {
  res.json({message: 'You are running low on beer'});
});
app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);

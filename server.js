var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var Beer = require('./models/beer');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var beersRoute = router.route('/beers');
var beerRoute = router.route('/beers/:beer_id');

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use(bodyParser.urlencoded({
  extended: true
}));

router.route('/beers')
  .post(beerController.postBeers)
  .get(beerController.getBeers);

router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

app.use('/api', router);
app.listen(port);
console.log('Insert beer on port ' + port);

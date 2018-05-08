let express = require('express');
let router = express.Router();
let Review = require('../models/review')

router.get('/', (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) throw (err);
    res.json({reviews})
  })
});

module.exports = router;

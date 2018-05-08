let express = require('express');
let util = require('../modules/util');
let router = express.Router();
var books = require('google-books-search');

router.post('/isbn', util.isAuthorized, (req, res) => {
  let isbn = req.body.isbn
  books.search(isbn, { field: 'isbn'}, (error, results) =>{
    if (error) return res.json({error})
    if (results.length === 0) return res.json({error: `No Results Found for ISBN Number: ${isbn}`})
    res.json({results})
  });
});

module.exports = router;

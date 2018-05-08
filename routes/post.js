let express = require('express');
let util = require('../modules/util');
let steem = require('../modules/steemconnect')
let router = express.Router();
let Review = require('../models/review')

router.get('/', util.isAuthenticated, (req, res, next) => {
    res.render('post', {
      name: req.session.steemconnect.name
    });
});

router.post('/create-post', util.isAuthenticated, (req, res) => {
    steem.setAccessToken(req.session.access_token);
    let author = req.session.steemconnect.name
    let permlink = util.urlString()
    var tags = req.body.tags.split(',').map(item => item.trim());
    let primaryTag = 'goodbook-review'
    let otherTags = tags
    let title = `${req.body.book} - ${req.body.author} - goodbook.reviews`
    let body = `<center>![${req.body.book} Book Cover](${req.body.cover})</center></br>` + req.body.post
    let customData = {
      isbn: req.body.isbn,
      tags: otherTags,
      quote: req.body.quote,
      book: req.body.book,
      author: req.body.author.split(', '),
      rating: req.body.rating,
      app: 'book.reviews.appv0.4.1',
      cover: req.body.cover,
      image: [req.body.cover]
    }

    var review = new Review({
      author: author,
      permlink: permlink,
      primaryTag: primaryTag,
      tags: tags,
      body: body,
      bookTitle: req.body.book,
      bookAuthors: req.body.author.split(', '),
      rating: req.body.rating,
      ISBN: req.body.isbn,
      coverImageUrl: req.body.cover,
      quote: req.body.quote
    });

    steem.comment('', primaryTag, author, permlink, title, body, customData, (err, steemResponse) => {
        if (err) {
          console.log(err)
          res.render('post', {
            name: req.session.steemconnect.name,
            msg: `Error - ${err}`
          })
        } else {
          review.save( (err) => {
            if (err) return console.log(err);
          });
          res.render('post', {
            name: req.session.steemconnect.name,
            msg: '👍 Posted To Steem Network'
          })
        }
    });
});

router.post('/vote', util.isAuthorized, (req, res) => {
    steem.setAccessToken(req.session.access_token);
    let postId = req.body.postId
    let voter = req.session.steemconnect.name
    let author = req.body.author
    let permlink = req.body.permlink
    let weight = parseInt(req.body.weight)

    console.log(voter, author, permlink, weight)

    steem.vote(voter, author, permlink, weight, function (err, steemResponse) {
      if (err) {
          res.json({ error: err.error_description })
      } else {
          res.json({ id: postId })
      }
    });
})


router.post('/comment',  util.isAuthorized, (req, res) => {
    steem.setAccessToken(req.session.access_token);
    let author = req.session.steemconnect.name
    let permlink = req.body.parentPermlink + '-' + util.urlString()
    let title = 'RE: ' + req.body.parentTitle
    let body = req.body.message
    let parentAuthor = req.body.parentAuthor
    let parentPermlink = req.body.parentPermlink
    steem.comment(parentAuthor, parentPermlink, author, permlink, title, body, '', (err, steemResponse) => {
      if (err) {
        res.json({ error: err.error_description })
      } else {
        res.json({
          msg: 'Posted To Steem Network',
          res: steemResponse
        })
      }
    });
});

module.exports = router;

let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) =>  {
    res.redirect('/latest');
});

router.get('/latest', (req, res, next) =>  {
  res.render('feed', {
    title: 'GoodBook.Reviews - Latest',
    feed: 'latest'
  });
});

router.get('/featured', (req, res, next) =>  {
  res.render('feed', {
    title: 'GoodBook.Reviews - Featured',
    feed: 'featured'
  });
});

router.get('/trending', (req, res, next) =>  {
  res.render('feed', {
    title: 'GoodBook.Reviews - Trending',
    feed: 'trending'
  });
});

router.get('/@:username', (req, res, next) => {
    let username = req.params.username
    res.render('profile', {
      name: username,
      feed: 'trending'
    });
});

router.get('/review/:category/:username/:slug', (req, res) => {
    let slug = req.params.slug
    let category = req.params.category
    let username = req.params.username

    res.render('single', {
      permlink: slug,
      category: category,
      username: username
    });
});


module.exports = router;

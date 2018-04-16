let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>  {
  if(req.session.steemconnect){
    let userMetadata = {};
    if (req.session.steemconnect.json_metadata == '' || req.session.steemconnect.json_metadata === undefined) {
      userMetadata.profile = { about: ''}
    } else {
      userMetadata = JSON.parse(req.session.steemconnect.json_metadata)
    }
    res.render('index', {
      auth: true,
      title: 'GoodBook.Reviews',
      name: req.session.steemconnect.name,
      profileImage: userMetadata.profile.profile_image
    });
  } else {
    res.render('index', { title: 'GoodBook.Reviews' });
  }
});

router.get('/@:username?', (req, res, next) => {
      let username = req.params.username
      console.log(username)
      res.render('profile', {
        name: username
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

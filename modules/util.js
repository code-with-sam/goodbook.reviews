module.exports.urlString = () => {
    let string = ''
    let allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++){
      string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return string;
}

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.steemconnect)
      return next();

  res.redirect('/');
}

module.exports.isAuthorized = (req, res, next) => {
  if (req.session.access_token)
      return next();

  res.json({
    status: 'fail',
    message: 'Please sign in.'
  })
}

module.exports.setUser = (req, res, next) => {
  if(req.session.steemconnect){
    let userMetadata = {};
    if (req.session.steemconnect.json_metadata == '' || req.session.steemconnect.json_metadata === undefined) {
      userMetadata.profile = { about: ''}
    } else {
      userMetadata = JSON.parse(req.session.steemconnect.json_metadata)
    }

    req.user = {
      name: req.session.steemconnect.name,
      profileImage: userMetadata.profile.profile_image
    }
    res.locals.user = req.user
  }
  next();
}

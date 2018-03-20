# Good Book.reviews
![GBR](https://user-images.githubusercontent.com/34964560/37649910-4988b622-2c2b-11e8-81ff-bfecbb215984.png)

## What does it include
- Express server with routing
- Authentication with Steemconnect
- Gallery View Template + Sidebar (Latest/Trending/Featured/User Feed)
- Data From Blockchain (Latest/Trending/User Feed) Can specify global tag, mvp uses 'book-review' but will use any tag for testing
-Featured - Currently uses Mock example (until Beta is setup allowing posts to be 'featured')
- Single View Template
- Create Post - Post to blockchain with custom metadata for Book/Author/Rating values

## setup & install
- install node.js & NPM - [https://nodejs.org/en/](https://nodejs.org/en/)
- clone repo
- Go to [https://v2.steemconnect.com/dashboard](https://v2.steemconnect.com/dashboard) and create a new app, it currently costs 3 STEEM.
- add the Redirect URI - http://localhost:3000/auth/
- open ```config.example.js``` and rename to ```config.js``` enter your ```client_id``` from steemconnect and redirect uri to 'http://localhost:3000/auth/', update the session secret to a new secure random string
- npm install // to download dependencies
- npm start // run the project on default port 3000
- navigate to localhost:3000 in your browser
- click on the blue 'login with steemconnect to authenticate your app'

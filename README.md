# Good Book.reviews
![GBR](https://user-images.githubusercontent.com/34964560/37649910-4988b622-2c2b-11e8-81ff-bfecbb215984.png)

The aim of this project is to create a book review platform that is powered by steem encourageing people to write in-depth value reviews. Steemit & Busy are both general purpose blogging platforms, that means they are able to accommodate many types of content but specialise for none. I believe creating a specialised platform for books onto of STEEM can foster a new community and bring value to the Blockchain as a whole.

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


## Compile SCSS & js via parcel
```npm install -g parcel-bundler```

```npm run dev``` - to watch for changes in src/ folder
```npm run build``` - builds for prod


- navigate to localhost:3000 in your browser
- click on the blue 'login with steemconnect to authenticate your app'

## FAQ

**Q**. What is Goodbook reviews?

**A**. This is the first online book discovery community on the steem block-chain, where Steemians can post book reviews.

**Q**. How do i use Goodbook reviews?

**A**. Goodbook reviews requires you to login via steemconnect on goodbook.reviews

**Q**. Is my login details safe on goodbook reviews?

**A**. Yes, goodbook.reviews uses steemconnect which is the most secured identity platform on the steem block-chain ( It only has access to your vote and comment keys).

**Q**. How do i add my own book review?

**A**. Select the **Post Review** button on the top right corner of the homepage.

**Q**. What are the details needed when posting a book review?

**A**. 
* Quote.
* Book Title.
* Book author name. 
* Book rating.
* Tags.
* Book Cover Image.

**Q**. Does my book review appear on my steemit blog?

**A**. Your comments are being added to your steemit comment page on your blog.


**Hope you enjoy the services being rendered by goodbook.review**

To contact us for anything relating to goodbook.review
use the following medium:

Github: https://github.com/code-with-sam/goodbook.reviews
Discord: sambillingham#7927


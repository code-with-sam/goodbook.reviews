let allUsers = []
let allContent = []
let converter = new showdown.Converter({ tables: true })
const APP_TAG = 'book-review' //goodbook-review
const USERNAME = 'sambillingham' // get from template

function getTrending(query, initial){
  steem.api.getDiscussionsByTrending(query, (err, result) => {
    if (err === null) {
      displayContent(result,initial)
      console.log(result)
      getaccounts(result.map(post => post.author))
    } else {
      console.log(err);
    }
  });
}

function getLatest(query, initial){

  steem.api.getDiscussionsByCreated(query, (err, result) => {
    if (err === null) {
      console.log(result)
      displayContent(result, initial)
      getaccounts(result.map(post => post.author))
    } else {
      console.log(err);
    }
  });
}

function getMoreContent(filter, tag){
  let lastItem = allContent[allContent.length - 1]
  let query = {
      'tag': tag,
      'limit': 24,
      start_author: lastItem.author,
      start_permlink: lastItem.permlink }

      if(filter === 'trending'){
        getTrending(query, false)
      } else {
        getLatest(query, false)
      }
}

function getBlog(username){
  let query = {
    tag: username,
    limit: 10
  }
  steem.api.getDiscussionsByBlog(query, (err, result) => {
      displayContent(result)
  })
}

function getUserFeed(username){
  console.log(username)
  let query = {
    tag: username,
    limit: 20
  }
  steem.api.getDiscussionsByFeed(query, (err, result) => {
    result = result.filter(data => data.parent_permlink === APP_TAG)
    displayContent(result)
  });
}
function loadFeaturedTemplate(){
  let data = `<div class="container"><a href="/review/book1"><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/tools.jpeg"><div class="review__content"><h2 class="review__book-title">Tools Of Titans</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Great for a 5 minute daily read.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/obstacle.jpg"><div class="review__content"><h2 class="review__book-title">The Obstacle Is The Way</h2><h2 class="review__book-author">Ryan Holiday</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Simple, but not easy practical advice to overcome adversity.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></a><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/million.jpeg"><div class="review__content"><h2 class="review__book-title">A Million Miles In A thousand Years</h2><h2 class="review__book-author">Donald Miller</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“There is no story without obstacles”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/rpo.jpg"><div class="review__content"><h2 class="review__book-title">Ready Player One</h2><h2 class="review__book-author">Eernest Cline</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Nerd overload in a futuristic VR dystopia, what’s not to like?”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/sapiens.jpg"><div class="review__content"><h2 class="review__book-title">Sapiens - A Brief History of Humankind</h2><h2 class="review__book-author">Yuval Noah Harari</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“What they don't teach about humans at school.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/bob1.jpg"><div class="review__content"><h2 class="review__book-title">We Are Legion (We Are Bob)</h2><h2 class="review__book-author">Dennis E. Taylor</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“A new spin on the Sci-fi adventure. I'd take the job.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/exp-f.jpg"><div class="review__content"><h2 class="review__book-title">Expeditionary Force</h2><h2 class="review__book-author">Criag Alanson</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Cpt. Skippy is hilarious”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/4hrww.jpg"><div class="review__content"><h2 class="review__book-title">The Four Hour Work Week</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“The kick you need to see a different way through life.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/money.jpg"><div class="review__content"><h2 class="review__book-title">The Inertnet Of Money</h2><h2 class="review__book-author">Andreas M. Antonopoulos</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Collection of talks but great for anyone wanting to learn about Bitcoin.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></div>`
  $('.feed-insert .container').empty()
  $('.feed-insert .container').append(data)

}

function displayContent(result, initial){
  if(initial && result.length > 1 || !initial && result.length > 0 ){
    if (!initial) result.shift()
    $('.feed-insert .container').empty()
    for (let i = 0; i < result.length ; i++) {
      let post = result[i];
      allContent.push(post)

      var urlRegex = /(https?:\/\/[^\s]+)/g;
      post.body = post.body.replace(urlRegex, (url) => {
        let last = url.slice(-3)
        if ( last === 'jpg' || last === 'png' || last === 'jpe' || last === 'gif' )  {
          return '<img src="' + url + '">';
        } else { return url }
      })

      if( typeof JSON.parse(post.json_metadata).image === 'undefined' ){
        image = genImageInHTML(post.body)
      } else {
        image = JSON.parse(post.json_metadata).image[0]
      }
      let json = getBookJson(post.json_metadata)

      let itemTemplate = `
      <a href="/review/${post.parent_permlink}/${post.author}/${post.permlink}">
      <div class="review" data-post-id="${post.id}" data-url="${post.url}" data-permlink="${ post.permlink }">
      <div class="review__background clearfix">
      <img class="review__cover" src="https://steemitimages.com/520x520/${image}" onerror="this.src='http://placehold.it/200x200'">
      <div class="review__content">
      <h2 class="review__book-title">${json.bookTitle}</h2>
      <h2 class="review__book-author">${json.bookAuthor}</h2>
      <h4 class="review__rating clearfix">${json.ratingHTML}</h4>
      <h3 class="review__quote">“${post.title}”</h3>
      <h4 class="review__author">Review By @${post.author}</h4></div>
      </div>
      </div>`
      $('.feed-insert .container').append(itemTemplate)
    }
  } else {
    $('.feed-insert .container').empty()
    $('.feed-insert .container').append('<p>No Reviews in your personal feed to display 🙁</p>')
  }
}

function getaccounts(usernames){
  steem.api.getAccounts(usernames, (err, result) => {
    allUsers = allUsers.concat(result)
  })
}

function genImageInHTML(markdown){
    let placeholder = document.createElement('div');
    placeholder.innerHTML = converter.makeHtml(markdown)
    let image = placeholder.querySelector('img') ;
    if (image) {
      return image.src
    } else {
      return false
    }
}

function getPostAndComments(url) {
  steem.api.getState(url, (err, result) => {
    let users = result.accounts;
    let resultsArray = [];
    for ( post in result.content ){

      var html = result.content[post].body

      resultsArray.push({
        id: result.content[post].id,
        title: result.content[post].root_title,
        author: result.content[post].author,
        body: html,
        json: result.content[post].json_metadata,
        permlink: result.content[post].permlink,
        depth: result.content[post].depth,
        root_comment: result.content[post].root_comment,
        parent_permlink: result.content[post].parent_permlink,
        created: result.content[post].created,
        votes: result.content[post].net_votes,
        voters: result.content[post].active_votes.map(vote => vote.voter),
        value: Math.round( parseFloat(result.content[post].pending_payout_value.substring(0,5)) * 100) / 100,
        commentCount: result.content[post].children
      })
    }

    // Sort By Date/ID
    resultsArray = resultsArray.sort((a,b) => {
      return b.id - a.id
    });

    // Find Deepest Comment
    let maxDepthComment = resultsArray.reduce((prev, current) => {
      return (prev.depth > current.depth) ? prev : current
    })

    // Multi demention array by
    let resultsByDepth = [];
    for (var i = 0; i < maxDepthComment.depth + 1; i++) {
      resultsByDepth.push(resultsArray.filter(elem => {
        return elem.depth === i
      }))
    }
    appendSinglePost(resultsByDepth[0][0], users)
    appendComments(resultsByDepth)

  })
}

function generateProfileImage(author){
  let profileImage = 'img/default-user.jpg';

  try {
    if (author.json_metadata === '' || typeof author.json_metadata === 'undefined' ) {
      author.json_metadata = { profile_image : false }
    } else {
      author.json_metadata = JSON.parse(author.json_metadata).profile
    }

    profileImage = author.json_metadata.profile_image ? 'https://steemitimages.com/128x128/' + author.json_metadata.profile_image : '';

  } catch(err){
    console.log(err)
  }
  return profileImage
}

function appendSinglePost(post, users){
  let author = users[post.author]
  let html = converter.makeHtml(post.body)
  let featureImageUrl = getFeatureImage(post)
  let profileImage = generateProfileImage(author)
  let AuthorReputation = steem.formatter.reputation(author.reputation)
  let postTime = moment(post.created).fromNow();
  let json = getBookJson(post.json)
  // let tags = JSON.parse(post.json).tags.reduce( (all,tag) => all + `<span>${tag}</span>`, '')
  html = html.replace(/img/, 'img class="review__content--first-image"');
  let aside = `
    <div class="single__book-meta">
      <img src="${featureImageUrl}" class="single__book-cover">
      <div class="single__book-rating stars clearfix">${json.ratingHTML}</div>
      <h2 class="review__book-title">${json.bookTitle}</h2>
      <h2 class="review__book-author">${json.bookAuthor}</h2>
    </div>
  `

  let header = `
    <div class="single__meta-container clearfix">
      <img src="${profileImage}" class="single__profile-image" width="35" height="35" src="">
      <div class="single__meta">
        <h3 class="single__meta-author title is-2">@${post.author} <span class="single__reputation">${AuthorReputation}</span></h3>
        <p class="single__datetime">${postTime} in ${post.parent_permlink}</p>
      </div>
      <div class="single__post-values">
        <span>${post.commentCount}<img src="/img/comment-icon.png"></span>
        <span>${post.votes}<img src="/img/zap-icon.png"></span>
      </div>
    </div>
    <h2 class="title">${post.title}</h2>
    <hr>
  `
  let voteButton = `
  <form method="post">
    <input type="hidden" name="postId" value="${post.id}">
    <input type="hidden" name="author" value="${post.author}">
    <input type="hidden" name="permlink" value="${post.permlink}">
    <input type="submit" class="vote" value="Vote">
  </form>`
  let commentBox = `
  <div>
    <textarea class="comment-message" rows="5"></textarea>
    <span class="send-comment" data-parent="${post.author}" data-parent-permlink="${post.permlink}" data-parent-title="${post.title}">Post Comment</span>
  </div>
  `
  $('.single__aside').append(aside)
  $('.single__content').append(header + html + voteButton + commentBox)
}

function appendComments(posts){
  $('main').append('<div class="comments"></div>')

    posts.forEach( (postsAtDepth, i, arr) => {
      postsAtDepth.forEach( (post, i, arr) => {
        let template = createCommentTemplate(post)
        if ( post.depth === 1 ) {
          $('.comments').prepend( template)
        } else if ( post.depth  > 1) {
          var permlink = post.parent_permlink
          $('.' + permlink ).append( template)
        }
      })
    })
}


createCommentTemplate = (post) => {
      var permlink = post.parent_permlink
      var html = converter.makeHtml(post.body)
      var voteMessage = (post.votes > 1 || post.votes == 0 )? 'votes' : 'vote'
      var voteValue = (post.value > 0) ? '</span> <span>|</span> <span>$' + post.value  + '</span><span>': ''
      var template = `
      <div data-post-id="${post.id}"
      data-permlink="${post.permlink}"
      data-author="${post.author}"
      data-title="${post.title}"
      data-post-depth="${post.depth}"
      class="comment comment-level-${post.depth} ${post.permlink}">
        <h4>
          <a href="https://steemit.com/@${post.author}" target="_blank">@${post.author}</a>
          <span> &middot; </span> <span> ${ post.created } </span>
        </h4>
        <p>${ html }</p>
        <div class="meta">
          <form method="post">
            <input type="hidden" name="postId" value="${post.id}">
            <input type="hidden" name="author" value="${post.author}">
            <input type="hidden" name="permlink" value="${post.permlink}">
            <input type="submit" class="vote" value="Vote">
          </form>
          <span class="sc-item__divider">|</span>
          <span class="sc-item__votecount">${post.votes} ${voteMessage} </span>
          <span class="sc-item__divider">|</span>
          <span class="sc-item__reply">Reply</span>
        </div>
      </div>`
      return template;
    }

getFeatureImage = (post) => {
      console.log(post)
      if( typeof JSON.parse(post.json).image === 'undefined' ){
        image = genImageInHTML(post.body)
      } else {
        image = JSON.parse(post.json).image[0]
      }
      return image
    }

getBookJson = (post_metadata) => {
  let json = {};
  try {
    json = JSON.parse(post_metadata)
  } catch(err){console.log(err)}

  let bookTitle = json.book || ''
  let bookAuthor = json.author || ''
  let rating = json.rating || ''
  let ratingHTML = '<img src="/img/star.png" class="review__star">'.repeat(rating) + '<img src="/img/star-empty.png" class="review__star">'.repeat(5-rating)

  return {
      bookTitle,
      bookAuthor,
      rating,
      ratingHTML
  }
}
getAccountInfo = (username) => {

    let totalVestingShares, totalVestingFundSteem;
    let userInfo;

    steem.api.getDynamicGlobalProperties((err, result) => {
      totalVestingShares = result.total_vesting_shares;
      totalVestingFundSteem = result.total_vesting_fund_steem;
    })

    return new Promise((resolve, reject) => {

      steem.api.getAccounts([username], (err, result) => {

        let user = result[0]

        let jsonData = user.json_metadata ? JSON.parse(user.json_metadata).profile : {}

        // steem power calc
        let vestingShares = user.vesting_shares;
        let delegatedVestingShares = user.delegated_vesting_shares;
        let receivedVestingShares = user.received_vesting_shares;
        let steemPower = steem.formatter.vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem);
        let delegatedSteemPower = steem.formatter.vestToSteem((receivedVestingShares.split(' ')[0])+' VESTS', totalVestingShares, totalVestingFundSteem);
        let outgoingSteemPower = steem.formatter.vestToSteem((receivedVestingShares.split(' ')[0]-delegatedVestingShares.split(' ')[0])+' VESTS', totalVestingShares, totalVestingFundSteem) - delegatedSteemPower;

        // vote power calc
        let lastVoteTime = (new Date - new Date(user.last_vote_time + "Z")) / 1000;
        let votePower = user.voting_power += (10000 * lastVoteTime / 432000);
        votePower = Math.min(votePower / 100, 100).toFixed(2);

        let data = {
          name: user.name,
          image: jsonData.profile_image ? 'https://steemitimages.com/512x512/' + jsonData.profile_image : '',
          rep: steem.formatter.reputation(user.reputation),
          effectiveSp: parseInt(steemPower  + delegatedSteemPower - -outgoingSteemPower),
          sp: parseInt(steemPower).toLocaleString(),
          delegatedSpIn: parseInt(delegatedSteemPower).toLocaleString(),
          delegatedSpOut: parseInt(-outgoingSteemPower).toLocaleString(),
          vp: votePower,
          steem: user.balance.substring(0, user.balance.length - 5),
          sbd: user.sbd_balance.substring(0, user.sbd_balance.length - 3),
          numOfPosts: user.post_count,
          followerCount: '',
          followingCount: '',
          usdValue: '',
          createdDate: new Date (user.created)
        }
        steem.api.getFollowCount(user.name, function(err, result){
          data.followerCount = result.follower_count
          data.followingCount = result.following_count
          resolve(data)
        })
        data.usdValue = steem.formatter.estimateAccountValue(user)
      })
    });
}


// ----------------------------------------------------

if ($('main').hasClass('gallery__wrapper') ) {

    // UI ACTIONS
    $('.sidebar__list-item').on('click', (e)=> {
      $('.sidebar__list-item').removeClass('is-active')
      $(e.currentTarget).addClass('is-active')
      let filter = $(e.currentTarget).data('filter')

      if(filter === 'trending'){
        getTrending({ 'tag': APP_TAG, 'limit': 20 })
      } else if(filter === 'feed'){
        getUserFeed(USERNAME)
      } else if(filter === 'latest'){
        getLatest({'tag': APP_TAG, 'limit': 20 })
      } else {
        //display Featured
        // getLatest({'tag': APP_TAG, 'limit': 20 })
        loadFeaturedTemplate()
      }
    })



}

if ($('main').hasClass('single')) {
  let data = $('main').data()
  getPostAndComments(`/${data.category}/@${data.username}/${data.permlink}`)
}

if ($('main').hasClass('dashboard')) {
  let username = $('main').data('username')
  getUserFeed(username)
}

if ($('main').hasClass('profile') ) {
  let username = $('main').data('username')
  getAccountInfo(username).then(data => {
    let template =
    `<section class="profile">
    <h2>${data.name} [${data.rep}]</h2>
    <img src="${data.image}" width="100px">
    <h5>Followers: ${data.followerCount}</h5>
    <h5>Following: ${data.followingCount}</h5>
    <h5>Effective Steem Power: ${data.effectiveSp}</h5>
    <h5>Steem Power: ${data.sp}</h5>
    <h5>STEEM: ${data.steem}</h5>
    <h5>SBD: ${data.sbd}</h5>
    <h5>Vote Power: ${data.vp}%</h5>
    </section>
    `
    $('main').prepend(template)
  })
  getBlog(username)
}


$('main').on('click', '.vote',(e) => {
  let $voteButton = $(e.currentTarget)
  e.preventDefault()
  $.post({
    url: '/post/vote',
    dataType: 'json',
    data:  $(e.currentTarget).parent().serialize()
  }, (response) => {
    if (response.error) {
      $(`<span>${response.error.error_description}</span>`).insertAfter($voteButton)
    } else {
      $('<span>Voted!</span>').insertAfter($voteButton)
    }
  })
})

$('main').on('click', '.send-comment', (e) => {
  let $comment = $(e.currentTarget)

  $.post({
        url: `/post/comment`,
        dataType: 'json',
        data: {
          parentAuthor: $comment.data('parent'),
          parentPermlink: $comment.data('parent-permlink'),
          message: $('.comment-message').val(),
          parentTitle: $comment.data('parent-title')
        }
      }, (response) => {
          console.log(response)
          $(`<p>${response.msg}</p>`).insertAfter($comment)
      })
})

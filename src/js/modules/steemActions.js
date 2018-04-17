import showdown from 'showdown'
import steem from 'steem'
import $ from 'jquery'

import feed from './feed'
import post from './post'

let allUsers = []
let converter = new showdown.Converter({ tables: true })
const APP_TAG = 'book-review' //goodbook-review

const getTrending = (query, initial) => {
  steem.api.getDiscussionsByTrending(query, (err, result) => {
    console.log(result)

    if (err === null) {
      feed.displayContent(result,initial)
      console.log(result)
      getaccounts(result.map(post => post.author))
    } else {
      console.log(err);
    }
  });
}
module.exports.getTrending = getTrending

const getLatest = (query, initial) => {
  steem.api.getDiscussionsByCreated(query, (err, result) => {
    console.log(err, result)
    if (err === null) {
      feed.displayContent(result, initial)
      getaccounts(result.map(post => post.author))
    } else {
      console.log(err);
    }
  });
}
module.exports.getLatest = getLatest

module.exports.getMoreContent = (filter, tag) => {
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

const getBlog = (username) => {
  let query = {
    tag: username,
    limit: 10
  }
  steem.api.getDiscussionsByBlog(query, (err, result) => {
      feed.displayContent(result)
  })
}
module.exports.getBlog = getBlog

module.exports.getUserFeed = (username) => {
  console.log(username)
  let query = {
    tag: username,
    limit: 20
  }
  steem.api.getDiscussionsByFeed(query, (err, result) => {
    result = result.filter(data => data.parent_permlink === APP_TAG)
    if ( result.length > 0) {
      feed.displayContent(result)
    } else {
      $('.feed-insert .container').append('<p>Looks like you\'re not following anyone who has posted a review yet 🤷‍♂️</p>')
    }
  });
}

const getaccounts = (usernames) => {
  steem.api.getAccounts(usernames, (err, result) => {
    allUsers = allUsers.concat(result)
  })
}
module.exports.getaccounts = getaccounts

module.exports.generateProfileImage = (author) => {
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


module.exports.getAccountInfo = (username) => {

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

module.exports.getPostAndComments = (url) => {
  steem.api.getState(url, (err, result) => {
    console.log(result)
    let users = result.accounts;
    let resultsArray = [];
    for (let post in result.content ){

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
    post.appendSinglePost(resultsByDepth[0][0], users)
    post.appendComments(resultsByDepth)
  })
}

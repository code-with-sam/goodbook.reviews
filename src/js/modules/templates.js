module.exports.postHeader = (post, profileImage, AuthorReputation, postTime) => {
  return `
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
}
module.exports.postAside = (post, featureImageUrl, json) => {
  return `
    <div class="single__book-meta">
      <img src="${featureImageUrl}" class="single__book-cover">
      <div class="single__book-rating stars clearfix">${json.ratingHTML}</div>
      <h2 class="review__book-title">${json.bookTitle}</h2>
      <h2 class="review__book-author">${json.bookAuthor}</h2>
    </div>
  `
}
module.exports.voteButton = (post) => {
  return `
  <span class="review__upvote" data-permlink="${post.permlink}" data-permlink="${post.permlink}" data-author="${post.author}" data-post-id="${post.id}">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 50 50" width="22px" height="22px">
  <circle fill="transparent" stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st0" cx="25" cy="25" r="23"/>
  <line stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st1" x1="13.6" y1="30.6" x2="26" y2="18.2"/>
  <line stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st2" x1="36.4" y1="30.6" x2="24" y2="18.2"/>
  </svg>
  </span>
  `
}

module.exports.commentBox = (post) => {
return `
<div>
  <textarea class="comment-message" rows="5"></textarea>
  <span class="send-comment" data-parent="${post.author}" data-parent-permlink="${post.permlink}" data-parent-title="${post.title}">Post Comment</span>
</div>
`
}

module.exports.voteSlider = () => {
return `
<div class="vote-bar">
   <span class="vote__btn">
   <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 50 50" width="30px" height="30px">
   <circle fill="transparent" stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st0" cx="25" cy="25" r="23"/>
   <line stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st1" x1="13.6" y1="30.6" x2="26" y2="18.2"/>
   <line stroke="#000000" stroke-width="3" strokemiterlimit="10" class="st2" x1="36.4" y1="30.6" x2="24" y2="18.2"/>
   </svg>
   </span>
   <span class="vote__value">50%</span>
   <input type="range" min="1" max="100" value="50" class="vote__slider" id="myRange">
   <span class="vote__close" >&#43;</span>
 </div>`
}

module.exports.comment = (post) => {
  var permlink = post.parent_permlink
  var html = converter.makeHtml(post.body)
  var voteMessage = (post.votes > 1 || post.votes == 0 )? 'votes' : 'vote'
  var voteValue = (post.value > 0) ? '</span> <span>|</span> <span>$' + post.value  + '</span><span>': ''
  return `
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
}

module.exports.userProfile = (data) => {
  return `<section class="profile">
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
}

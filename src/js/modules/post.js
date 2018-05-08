import showdown from 'showdown'
import steem from 'steem'
import moment from 'moment'
import $ from 'jquery'

import * as t from './templates'
import util from './util'
import s from './steemActions'

let converter = new showdown.Converter({ tables: true, strikethrough: true })

module.exports.appendSinglePost = (post, users)=> {
  let author = users[post.author]
  let html = converter.makeHtml(post.body)
  let json = util.getBookJson(post.json)
  let featureImageUrl = json.cover || util.getFeatureImage(post)
  let profileImage = s.generateProfileImage(author)
  let AuthorReputation = steem.formatter.reputation(author.reputation)
  // let tags = JSON.parse(post.json).tags.reduce( (all,tag) => all + `<span>${tag}</span>`, '') // will be generes

  html = html.replace(/img/, 'img class="review__content--first-image"');
  let aside = t.postAside(post, featureImageUrl, json)
  let header = t.postHeader(post, profileImage, AuthorReputation, json)
  let voteButton = t.voteButton(post)
  let commentBox = t.commentBox(post)

  $('.single__aside').append(aside)
  $('.single__content').append(header + html + voteButton + commentBox)
}

module.exports.addVoteTemplateAfter = (dest) => {
    $('.vote-bar').remove()
    $(t.voteSlider()).insertAfter(dest)
}

module.exports.appendComments = (posts) => {
  $('.single__content').append('<div class="comments"></div>')

    posts.forEach( (postsAtDepth, i, arr) => {
      postsAtDepth.forEach( (post, i, arr) => {
        let template = t.comment(post)
        if ( post.depth === 1 ) {
          $('.comments').prepend( template)
        } else if ( post.depth  > 1) {
          var permlink = post.parent_permlink
          $('.' + permlink ).append( template)
        }
      })
    })
}

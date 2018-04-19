import $ from 'jquery'
import showdown from 'showdown'

import util from './util'

let allContent = []
let converter = new showdown.Converter({ tables: true })

module.exports.displayContent = (result, initial) => {
  if(initial && result.length >= 1 || !initial && result.length > 0 ){
    if (!initial) result.shift()
    $('.feed-insert .container').empty()
    for (let i = 0; i < result.length ; i++) {
      let post = result[i];
      let image;
      allContent.push(post)

      var urlRegex = /(https?:\/\/[^\s]+)/g;
      post.body = post.body.replace(urlRegex, (url) => {
        let last = url.slice(-3)
        if ( last === 'jpg' || last === 'png' || last === 'jpe' || last === 'gif' )  {
          return '<img src="' + url + '">';
        } else { return url }
      })

      let json = util.getBookJson(post.json_metadata)

      if( json.cover ){
        image = json.cover
      } else if( typeof JSON.parse(post.json_metadata).image === 'undefined' ){
        image = util.genImageInHTML(post.body)
      } else {
        image = JSON.parse(post.json_metadata).image[0]
      }

      let itemTemplate = `
      <a href="/review/${post.parent_permlink}/${post.author}/${post.permlink}">
      <div class="review" data-post-id="${post.id}" data-url="${post.url}" data-permlink="${ post.permlink }">
      <div class="review__background">
      <img class="review__cover" src="https://steemitimages.com/520x520/${image}" onerror="this.src='http://placehold.it/200x200'">
      <div class="review__content">
      <h2 class="review__book-title">${json.bookTitle}</h2>
      <h2 class="review__book-author">${json.bookAuthor}</h2>
      <h4 class="review__rating">${json.ratingHTML}</h4>
      <h3 class="review__quote">“${json.quote}”</h3>
      <h4 class="review__author">Review By @${post.author}</h4></div>
      </div>
      </div>`
      $('.feed-insert .container').append(itemTemplate)
    }
  } else {
    $('.feed-insert .container').empty()
    $('.feed-insert .container').append('<p>No Reviews to display 🙁</p>')
  }
}

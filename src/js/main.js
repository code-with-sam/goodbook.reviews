// style imports via parcel
import 'bootstrap/dist/css/bootstrap.css';
import "../scss/main.scss"

// dependencies
// import showdown from 'showdown'
import moment from 'moment'
import $ from 'jquery'
import steem from 'steem'

//modules
import * as t from './modules/templates'
import util from './modules/util'
import s from './modules/steemActions'


const APP_TAG = 'book-review' //goodbook-review
// const APP_TAG = 'goodbook-test' //goodbook-review

function loadFeaturedTemplate(){
  let data = `<div class="container"><a href="/review/book1"><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/tools.jpeg"><div class="review__content"><h2 class="review__book-title">Tools Of Titans</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Great for a 5 minute daily read.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/obstacle.jpg"><div class="review__content"><h2 class="review__book-title">The Obstacle Is The Way</h2><h2 class="review__book-author">Ryan Holiday</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Simple, but not easy practical advice to overcome adversity.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></a><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/million.jpeg"><div class="review__content"><h2 class="review__book-title">A Million Miles In A thousand Years</h2><h2 class="review__book-author">Donald Miller</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“There is no story without obstacles”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/rpo.jpg"><div class="review__content"><h2 class="review__book-title">Ready Player One</h2><h2 class="review__book-author">Eernest Cline</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Nerd overload in a futuristic VR dystopia, what’s not to like?”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/sapiens.jpg"><div class="review__content"><h2 class="review__book-title">Sapiens - A Brief History of Humankind</h2><h2 class="review__book-author">Yuval Noah Harari</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“What they don't teach about humans at school.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/bob1.jpg"><div class="review__content"><h2 class="review__book-title">We Are Legion (We Are Bob)</h2><h2 class="review__book-author">Dennis E. Taylor</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“A new spin on the Sci-fi adventure. I'd take the job.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/exp-f.jpg"><div class="review__content"><h2 class="review__book-title">Expeditionary Force</h2><h2 class="review__book-author">Criag Alanson</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Cpt. Skippy is hilarious”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/4hrww.jpg"><div class="review__content"><h2 class="review__book-title">The Four Hour Work Week</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“The kick you need to see a different way through life.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/money.jpg"><div class="review__content"><h2 class="review__book-title">The Inertnet Of Money</h2><h2 class="review__book-author">Andreas M. Antonopoulos</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Collection of talks but great for anyone wanting to learn about Bitcoin.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></div>`
  $('.feed-insert .container').empty()
  $('.feed-insert .container').append(data)

}

// ----------------------------------------------------

if ($('main').hasClass('gallery__wrapper') ) {
  let filter = $('main').data('feed-type')

  if(filter === 'trending'){
    s.getTrending({ 'tag': APP_TAG, 'limit': 20 }, true)
  } else if(filter === 'feed'){
    let username = $('main').data('username')
    s.getUserFeed(username)
  } else if(filter === 'latest'){
    s.getLatest({'tag': APP_TAG, 'limit': 20 }, true)
  } else {
    //display Featured
    // getLatest({'tag': APP_TAG, 'limit': 20 })
    loadFeaturedTemplate()
  }
}


if ($('main').hasClass('single')) {
  let data = $('main').data()
  s.getPostAndComments(`/${data.category}/@${data.username}/${data.permlink}`)
}

if ($('main').hasClass('dashboard')) {
  let username = $('main').data('username')
  s.getUserFeed(username)
}

if ($('main').hasClass('profile') ) {
  let username = $('main').data('username')
  s.getAccountInfo(username).then(data => {
    $('main').prepend(t.userProfile(data))
  })
  s.getBlog(username)
}


$('main').on('click', '.review__upvote', (e) => {
  addVoteTemplateAfter('.review__upvote')
})

$('.single__wrapper').on('input', '.vote__slider', (e) => {
  let weight = $('.vote__slider').val()
  $('.vote__value').text(weight + '%')
})

$('.single__wrapper').on('click', '.vote__btn', (e) => {
  let el = $(e.currentTarget)
  let weight = $('.vote__slider').val() * 100
  let permlink = el.parent().prev().data('permlink')
  let author = el.parent().prev().data('author')
  let postId = el.parent().prev().data('post-id')
  sendVote(postId,author, permlink, weight)
})

function sendVote(postId, author, permlink, weight) {
    $.post({
      url: '/post/vote/',
      dataType: 'json',
      data: {postId, author, permlink, weight}
    }, (response) => {
      console.log(response)
    })
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

$('.single__wrapper').on('click', '.vote__close', (e) => {
  $(e.currentTarget).parent().remove()
});


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

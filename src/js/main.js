// style imports via parcel
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
import post from './modules/post'
import c from './modules/constants'

function loadFeaturedTemplate(){
  let data = `<div class="container"><a href="/review/book1"><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/tools.jpeg"><div class="review__content"><h2 class="review__book-title">Tools Of Titans</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Great for a 5 minute daily read.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/obstacle.jpg"><div class="review__content"><h2 class="review__book-title">The Obstacle Is The Way</h2><h2 class="review__book-author">Ryan Holiday</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“Simple, but not easy practical advice to overcome adversity.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></a><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/million.jpeg"><div class="review__content"><h2 class="review__book-title">A Million Miles In A thousand Years</h2><h2 class="review__book-author">Donald Miller</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“There is no story without obstacles”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/rpo.jpg"><div class="review__content"><h2 class="review__book-title">Ready Player One</h2><h2 class="review__book-author">Eernest Cline</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Nerd overload in a futuristic VR dystopia, what’s not to like?”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/sapiens.jpg"><div class="review__content"><h2 class="review__book-title">Sapiens - A Brief History of Humankind</h2><h2 class="review__book-author">Yuval Noah Harari</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star-empty.png"></h4><h3 class="review__quote">“What they don't teach about humans at school.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/bob1.jpg"><div class="review__content"><h2 class="review__book-title">We Are Legion (We Are Bob)</h2><h2 class="review__book-author">Dennis E. Taylor</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“A new spin on the Sci-fi adventure. I'd take the job.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/exp-f.jpg"><div class="review__content"><h2 class="review__book-title">Expeditionary Force</h2><h2 class="review__book-author">Criag Alanson</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Cpt. Skippy is hilarious”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/4hrww.jpg"><div class="review__content"><h2 class="review__book-title">The Four Hour Work Week</h2><h2 class="review__book-author">Tim Ferriss</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“The kick you need to see a different way through life.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div><div class="review"><div class="review__background clearfix"><img class="review__cover" src="/img/money.jpg"><div class="review__content"><h2 class="review__book-title">The Inertnet Of Money</h2><h2 class="review__book-author">Andreas M. Antonopoulos</h2><h4 class="review__rating clearfix"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"><img class="review__star" src="/img/star.png"></h4><h3 class="review__quote">“Collection of talks but great for anyone wanting to learn about Bitcoin.”</h3><h4 class="review__author">Review By @sambillingham</h4></div></div></div></div>`
  $('.feed-insert .container').empty()
  $('.feed-insert .container').append(data)
}

function loadBetaTemplate(title){
  let data = `
  <div class="container">
    ${title} is disabled during Beta, it will be ready soon 😉💻🚀
  </div>`
  $('.feed-insert .container').empty()
  $('.feed-insert .container').append(data)
}

// ----------------------------------------------------

if ($('main').hasClass('gallery__wrapper') ) {
  let filter = $('main').data('feed-type')
  let username = $('main').data('username')
  if(filter === 'trending'){
    loadBetaTemplate('The Trending 📈 section')
  } else if(filter === 'feed'){
    s.getUserFeed(username)
  } else if(filter === 'latest'){
    $.getJSON( '/reviews', data => feed.displayContentDd(data.reviews.reverse()) );
  } else if(filter === 'featured'){
    loadBetaTemplate('The featured 🏆 section')
  } else if(filter === 'user'){
    s.getBlog(username)
  }  else {
    loadBetaTemplate('Searching by genre ')
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
    $(t.userProfile(data)).insertAfter('.sidebar')
  })
}

$('form').on('change', '.book-cover-upload--manual', () => {
  submitBookCoverToCloudinary()
})

$('.isbn-search').on('click', (e) => {
  $('.search--error').remove()
  let isbnNumber = $('.isbn-input').val()
  console.log('ISBN input: ', isbnNumber)
  search.isbn(isbnNumber)
    .then( data => {
      $('.isbn-formfield--hidden').val(isbnNumber)
      if (data.results[0].thumbnail) {
        $('.book-cover-upload').val(data.results[0].thumbnail)
        submitBookCoverToCloudinary(data.results[0].thumbnail)
      } else {
        showManualBookCoverForm()
      }
      autoFillBookFormData(data.results[0])
    })
    .catch( data => {
      console.log(data)
      displayISBNSearchError(data)
    })
})

$('main').on('click', '.review__upvote', (e) => {
  post.addVoteTemplateAfter(e.currentTarget)
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


window.ajaxSuccess = function () {
	let response = JSON.parse(this.responseText);
  console.log("ajaxSuccess", typeof this.responseText);
  document.querySelector('.uploaded-book-cover').setAttribute('src', response['secure_url']);
  $('.cover-url').val(response['secure_url'])
}

function submitBookCoverToCloudinary(){
  let formElement = document.querySelector('.book-cover-form')
  if (!formElement.action) { return; }
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open('post', 'https://api.cloudinary.com/v1_1/detot19ym/image/upload');
  xhr.send(new FormData(formElement));
}

function showManualBookCoverForm(){
  $('.notification, .book-cover-upload--manual, .book-cover-upload').remove()
  let template = `
  <input type="file" name="file" value="" class="form-control book-cover-upload--manual form-control-file">
  <p class="notification">A cover photo could not be found please upload one. Recommended dimensions ~300wx500h</p>
  `
  $('.book-cover-form').prepend(template)
}

function autoFillBookFormData(data){
  $('input#title').val(data.title)
  $('input#author').val(data.authors.join(', '))
}

function displayISBNSearchError(data){
  $('.search--error').remove()
  let template = `<div class="error search--error">${data.error}<div>`
  $(template).insertAfter('.isbn-search')
}

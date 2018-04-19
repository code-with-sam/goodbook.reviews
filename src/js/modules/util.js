import showdown from 'showdown'

let converter = new showdown.Converter({ tables: true })

const genImageInHTML = (markdown) => {
    let placeholder = document.createElement('div');
    placeholder.innerHTML = converter.makeHtml(markdown)
    let image = placeholder.querySelector('img') ;
    if (image) {
      return image.src
    } else {
      return false
    }
}

module.exports.getFeatureImage = (post) => {
  let image;
  if( typeof JSON.parse(post.json).image === 'undefined' ){
    image = genImageInHTML(post.body)
  } else {
    image = JSON.parse(post.json).image[0]
  }
  return image
}

module.exports.genImageInHTML = genImageInHTML

module.exports.getBookJson = (post_metadata) => {
  let json = {};
  try {
    json = JSON.parse(post_metadata)
  } catch(err){console.log(err)}

  let bookTitle = json.book || ''
  let bookAuthor = json.author || ''
  let rating = json.rating || ''
  let quote = json.quote || ''
  let cover = json.cover || ''
  let ratingHTML = '<img src="/img/star.png" class="review__star">'.repeat(rating) + '<img src="/img/star-empty.png" class="review__star">'.repeat(5-rating)

  return {
      bookTitle,
      bookAuthor,
      rating,
      ratingHTML,
      cover,
      quote
  }
}

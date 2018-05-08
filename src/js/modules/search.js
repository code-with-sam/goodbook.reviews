import $ from 'jquery'

module.exports.isbn = (isbn) => {
  return new Promise((resolve, reject) => {
    $.post({
      url: '/search/isbn/',
      dataType: 'json',
      data: {isbn}
    }, (response) => { resolve(response) })
  });
}

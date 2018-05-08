import $ from 'jquery'

module.exports.isbn = (isbn) => {
  return new Promise((resolve, reject) => {
    $.post({
      url: '/search/isbn/',
      dataType: 'json',
      data: {isbn}
    }, (response) => {
      if (response.error) {
        reject(response)
      } else {
        resolve(response)
      }
    })
  });
}

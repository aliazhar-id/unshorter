const { get } = require('https');

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    get(url, ({ rawHeaders }) => {
      resolve(rawHeaders[rawHeaders.indexOf('Location') + 1]);
    }).on('error', () => reject());
  });
};

const https = require('https');
const http = require('http');

module.exports = async (url, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const tracer = (urls) => {
        let protocol = https;

        if (urls.slice(0, 5) === 'http:') {
          protocol = http;
        }

        protocol
          .get(urls, options, ({ statusCode, headers }) => {
            if ([301, 302, 303, 307, 308].includes(statusCode)) {
              if (headers.location) {
                tracer(headers.location);
                return;
              }
            }
            resolve(urls);
          })
          .on('error', (err) => reject(err));
      };

      tracer(url);
    } catch (err) {
      reject(err);
    }
  });
};

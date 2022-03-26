const https = require('https');
const http = require('http');

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    const tracer = (url) => {
      let protocol = https;

      if (url.slice(0, 5) === 'http:') {
        protocol = http;
      }

      protocol.get(url, { headers: { 'User-Agent': 'FetchStream' } }, ({statusCode, headers}) => {
        if ([301, 302, 303, 307, 308].includes(statusCode)) {
          if (headers.location) {
            tracer(headers.location);
            return;
          }
        }
        resolve(url);
      }).on('error', () => reject());
    };

    tracer(url);
  });
};

const https = require('https');
const http = require('http');

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    try {
      const tracer = (urls) => {
        const protocol = urls.replace(/:?\/\/.*/g, '');

        if (protocol.length > 5) throw new ReferenceError('Something wrong with the protocol');

        eval(protocol)
          .get(urls, { headers: { 'User-Agent': 'okhttp' } }, ({ statusCode, headers }) => {
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

const { get } = require('https');

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    const tracer = (url) => {
        get(url, { headers: { 'User-Agent': 'FetchStream' } }, (res) => {
          if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
            if (res.headers.location) {
              tracer(res.headers.location);
              return;
            }
          }
          resolve(url);
        }).on('error', () => reject());
      };

      tracer(url);
  });
};

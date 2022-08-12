const http = require("http");
const https = require("https");

module.exports = async (url, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const tracer = (urls) => {
        function choose(protocol) {
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
            .on("error", (e) => reject(new Error(e?.message)));
        }
        try {
          choose(http);
        } catch {
          choose(https);
        }
      };
      tracer(url);
    } catch (err) {
      reject(new Error(err?.message));
    }
  });
};

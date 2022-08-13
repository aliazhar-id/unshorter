// src/index.ts
import * as http from "http";
import * as https from "https";
async function unshort(url, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const tracer = (uri) => {
        function io(p) {
          p.get(uri, options, function({ headers, statusCode = 200 }) {
            if ([301, 302, 303, 307, 308].includes(statusCode)) {
              if (headers.location) {
                tracer(headers.location);
                return;
              }
            }
            resolve(uri);
          }).on("error", (e) => reject(e));
        }
        try {
          io(http);
        } catch {
          io(https);
        }
      };
      tracer(url);
    } catch (err) {
      reject(err);
    }
  });
}
export {
  unshort
};

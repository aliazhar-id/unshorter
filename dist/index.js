var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  unshort: () => unshort
});
module.exports = __toCommonJS(src_exports);
var http = __toESM(require("http"));
var https = __toESM(require("https"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  unshort
});

const { unshorter } = require(".");

(async () => {
  const longUrl = await unshorter("https://t.co/ajJlJUzATQ");
  console.info(longUrl);
})();

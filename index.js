import https from 'https';

export default async (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, ({ rawHeaders }) => {
        resolve(rawHeaders[rawHeaders.indexOf('Location') + 1]);
      })
      .on('error', () => reject());
  });
};
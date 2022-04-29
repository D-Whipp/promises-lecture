const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.watchFile(file, data, (err) => {
      if (err) reject('I could not write the file');
      resolve('Success');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePromise('dog.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    return console.log(err.message);
  });

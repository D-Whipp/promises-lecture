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
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file ??');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const result1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([
      result1Promise,
      result2Promise,
      result3Promise,
    ]);
    const images = all.map((el) => el.body.message);

    console.log(images);
    // console.log(res.body.message);

    await writeFilePromise('dog-img.txt', images.join('\n'));
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pictures');
  } catch (err) {
    console.log(err);
  }
})();

// console.log('1: Will get dog pics');
// getDogPic().then(x => {
//   console.log(x);
//   console.log('3: Done getting dog pics');
// });

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePromise('dog.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     return console.log(err.message);
//   });

const express = require('express');
const fs = require('fs');
const path = require('path');
const change = require('diff-json');
const decoder = require('../lib/decoder');

const router = express.Router();

/* GET users listing. */
router.get('/diff/:id', (req, res) => {
  const dataRight = fs.readFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-right`));
  const dataLeft = fs.readFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`));

  const dRight = JSON.parse(dataRight);
  const dLeft = JSON.parse(dataLeft);
  const result = change.diff(dLeft, dRight);
  console.log('res', result);

  res.status(200).send(`respond with a resource result ${123}`);
});

function decode(data) {
  return (new Buffer(data, 'base64')).toString();
}

function createFile(direction, name, content) {
  console.log('cont', content);
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${name}-${direction}`), content);
}

router.post('/diff/:id/left', (req, res) => {
  let size = 0;
  let file = '';

  req.on('data', (data) => {
    size += data.length;
    file += data.toString();
    console.log('Got chunk: ' + data.length + ' total: ' + size);
  });

  req.on('end', () => {
    console.log('total size = ' + size);
    console.log('file', file);
    createFile('left', req.params.id, decode(file));
    res.end('Thanks');
  });

  req.on('error', (e) => {
      console.log("ERROR ERROR: " + e.message);
  });
});

// router.post('/diff/:id/old/left', (req, res) => {
//   console.log('the body is', req.body);
//   const encoded = Buffer.from(JSON.stringify(req.body)).toString('base64');
//   console.log(encoded);
//   fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`), encoded, {
//     encoding: 'base64',
//   });
//   console.log(Buffer.from(encoded, 'base64').toString());
//   res.status(200).send('respond with a resource left');
// });

// router.post('/diff/:id/old/right', (req, res) => {
//   console.log('the body is', req.body);
//   const jsonStr = JSON.stringify(req.body);
//   console.log('the json is', jsonStr);
//   createFile('right', req.params.id, decode(jsonStr));
//   res.status(200).send('respond with a resource right');
// });

router.post('/diff/:id/right', (req, res) => {
  let file = '';

  req.on('data', (data) => {
    file += data.toString();
  });

  req.on('end', () => {
    console.log('file', file);
    createFile('right', req.params.id, decode(file));
    res.end('Thanks');
  });

  req.on('error', (e) => {
    console.error("ERROR ERROR: " + e.message);
  });
});

router.post('/diff/:id/xdecode', (req, res) => {
  console.log('the body is', req.body);
  const jsonStr = JSON.stringify(req.body);
  console.log('the json is', jsonStr);

  const str = (new Buffer(jsonStr, 'base64')).toString();
  console.log('the string is', str);

  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`), str);
  // console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource left');
});

router.post('/diff/:id/decode', (req, res) => {
  console.log('the body is', req.body);
  const jsonStr = JSON.stringify(req.body);
  console.log('the json is', jsonStr);
  // const str = jsonStr.toString('base64');
  // const str = JSON.parse(req.body);
  // console.log('the string is', str);

  const str = (new Buffer(jsonStr, 'base64')).toString();
  console.log('the string is', str);

  const decoded = Buffer.from(JSON.stringify(req.body)).toString('base64');
  console.log(decoded);
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`), decoded, {
    encoding: 'base64',
  });
  // console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource left');
});

router.post('/diff/:id/create', (req, res) => {
  const encoded = Buffer.from(JSON.stringify(req.body)).toString('base64');
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-created`), encoded);
  console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource right');
});
router.post('/diff/:id/create2', (req, res) => {
  const encoded = Buffer.from(JSON.stringify(req.body));
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-created`), encoded, {
    encoding: 'base64',
  });
  console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource right');
});

router.post('/diff/:id/binar', (req, res) => {
  var size = 0;
  let file = '';

  req.on('data', function (data) {
    size += data.length;
    file += data.toString();
    console.log('Got chunk: ' + data.length + ' total: ' + size);
  });

  req.on('end', function () {
    console.log('total size = ' + size);
    console.log('file', file);
    res.end('Thanks');
  });

  req.on('error', function(e) {
      console.log("ERROR ERROR: " + e.message);
  });
  // res.status(200).send('respond with a resource right');
});

// golden rule
// If you need to convert to Base64 you could do so using Buffer:
// console.log(Buffer.from('Hello World!').toString('base64'));
// Reverse (assuming the content you're decoding is a utf8 string):
// console.log(Buffer.from(b64Encoded, 'base64').toString());

// As json only supports text so we have to convert binary file (pdf, image etc)
// in to a string. And then we can easily add it to a json field.

// Always remember to encode your base 64 string in utf8 format at server end other
//  wise you may always get problems on browser.
module.exports = router;

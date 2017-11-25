const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* GET users listing. */
router.get('/diff/:id', (req, res) => {
  const data = fs.readFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-right`), {
    encoding: 'base64',
  });
  const decoded = Buffer.from(data, 'base64').toString();
  console.log('decoded', decoded);

  res.status(200).send(`respond with a resource result ${123}`);
});

router.post('/diff/:id/left', (req, res) => {
  const encoded = Buffer.from(JSON.stringify(req.body)).toString('base64');
  console.log(encoded);
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`), encoded, {
    encoding: 'base64',
  });
  console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource left');
});

router.post('/diff/:id/right', (req, res) => {
  const encoded = Buffer.from(req.body.toString('base64'));
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-rights`), encoded, {
    encoding: 'base64',
  });
  console.log(Buffer.from(encoded, 'base64').toString());
  res.status(200).send('respond with a resource right');
});

function decode(data) {
  return (new Buffer(data, 'base64')).toString();
}

function createFile(direction, content) {
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-${direction}`), content);
}


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

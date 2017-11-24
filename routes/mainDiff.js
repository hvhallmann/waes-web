const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* GET users listing. */
router.get('/diff/:id', function(req, res, next) {
  console.log('yolo', req.params.id);

  const data = fs.readFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-right`), {
    encoding: 'base64',
  });
  const decoded = Buffer.from(data, 'base64').toString();
  console.log('decoded', decoded);
  // const buff = new Buffer(data, 'base64');
  // const text = buff.toString();
  // console.log('converted to base 64 is:\n\n', text);

  res.status(200).send(`respond with a resource result ${123}`);
});

router.post('/diff/:id/left', function(req, res, next) {
  const buff = new Buffer(JSON.stringify(req.body));
  // const base64data = buff.toString('base64');
  // console.log(`${data} converted to Base64 is ${base64data}`);

  // const buff = fs.readFileSync(path.resolve(__dirname, 'profile2.png'));
  console.log('my buyf is', buff);
  const base64data = buff.toString('base64');
  console.log('converted to base 64 is:\n\n', base64data);

  const letsGoBack = base64data.toString();
  console.log('letsGoBack', letsGoBack);
  console.log('letsGoBack', JSON.parse(letsGoBack));

  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-left`), base64data);

  res.status(200).send('respond with a resource left');
});

router.post('/diff/:id/right', function(req, res, next) {
  console.log('yolo3', req.params.id);
  const encoded = Buffer.from(JSON.stringify(req.body)).toString('base64');
  console.log('encoded', encoded);
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${req.params.id}-right`), encoded, {
    encoding: 'base64',
  });
  console.log(Buffer.from(encoded, 'base64').toString());
  // var encoded = btoa(JSON.stringify(req.body));
  res.status(200).send('respond with a resource right');
});

module.exports = router;

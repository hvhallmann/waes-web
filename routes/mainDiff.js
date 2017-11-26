const express = require('express');
const fs = require('fs');
const path = require('path');

const decoder = require('../lib/decoder');

const router = express.Router();

/* GET diff result of files comparison. */
router.get('/diff/:id', (req, res) => {
  const dataRight = decoder.readFile(req.params.id, 'right');
  const dataLeft = decoder.readFile(req.params.id, 'left');

  const response = decoder.diffFiles(dataRight, dataLeft);

  res.status(200).send(response);
});

/* POST route to include into the system the left entry.
   It is creating files to diff it later
*/
router.post('/diff/:id/left', (req, res) => {
  let file = '';

  req.on('data', (data) => {
    file += data.toString();
  });

  req.on('end', () => {
    const input = decoder.decode(file);
    decoder.createFile('left', req.params.id, input);
    res.end('Thanks - left entry decoded');
  });

  req.on('error', (e) => {
    console.error('ERROR: ', e.message);
  });
});

/* POST route to include into the system the right entry.
   It is creating files to diff it later
 */
router.post('/diff/:id/right', (req, res) => {
  let file = '';

  req.on('data', (data) => {
    file += data.toString();
  });

  req.on('end', () => {
    const input = decoder.decode(file);
    decoder.createFile('right', req.params.id, input);
    res.end('Thanks - right entry decoded');
  });

  req.on('error', (e) => {
    console.error('ERROR: ', e.message);
  });
});

router.post('/diff/:id/create', (req, res) => {
  const input = decoder.encode(req.body);
  decoder.createFile('create', req.params.id, input);
  res.status(200).send('JSON base64 encoded binary created');
});

module.exports = router;

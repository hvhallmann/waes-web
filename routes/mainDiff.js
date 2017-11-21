const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/diff/:id', function(req, res, next) {
  console.log('yolo', req.params.id);
  res.status(200).send('respond with a resource result');
});

router.get('/diff/:id/left', function(req, res, next) {
  console.log('yolo2', req.params.id);
  res.status(200).send('respond with a resource left');
});

router.get('/diff/:id/right', function(req, res, next) {
  console.log('yolo3', req.params.id);
  res.status(200).send('respond with a resource right');
});

module.exports = router;

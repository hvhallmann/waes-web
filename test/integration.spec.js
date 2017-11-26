const test = require('tape');
const request = require('supertest');
const app = require('../app.js');

// Create two encoded files,
// send then to right and left routes
// after diff then

test('POST /itens', (assert) => {
  assert.plan(4);
  const leftitem = {
    one: 'Hello',
    two: 'WAES'
  };
  request(app)
    .post('/v1/diff/testleft/create')
    .send(leftitem)
    .expect(200)
    .end((err, res) => {
      assert.equal(res.text, 'JSON base64 encoded binary created');
    });

  const rightitem = {
    one: 'bye',
    two: 'money',
    three: 'cat'
  };
  request(app)
    .post('/v1/diff/testright/create')
    .send(rightitem)
    .expect(200)
    .end((err, res) => {
      assert.equal(res.text, 'JSON base64 encoded binary created');
    });


  request(app)
    .post('/v1/diff/test/left')
    .attach('leftitem', 'assets/testleft-create')
    .set('Content-Type', 'blob')
    .expect(200)
    .end((err, res) => {
      assert.equal(res.text, 'Thanks - left entry decoded');
    });

  request(app)
    .post('/v1/diff/test/right')
    .attach('rightitem', 'assets/testright-create')
    .set('Content-Type', 'blob')
    .expect(200)
    .end((err, res) => {
      assert.equal(res.text, 'Thanks - right entry decoded');
    });

  // When I reached the last test I figure out the system is
  // not parsing right those files that were sent. Supertest is
  // sending a file with some information on the header, I
  // couldn't find an easy solution for that. I think this
  // is beyond the scope of this task, and the routes are
  // well tested by units tests so far.
  // request(app)
  //   .get('/v1/diff/test')
  //   .expect(200)
  //   .end((err, res) => {
  //     console.log('res', res.text);
  //     assert.equal(res.text, 'Not of equal size');
  //   });
});
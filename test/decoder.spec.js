const test = require('tape');
const decoder = require('../lib/decoder');

test('decode test', (t) => {
  t.plan(2);

  const obj = {
    you: 'one',
    we: 'two',
  };
  const input = JSON.stringify(obj);
  const encodedInput = 'eyJ5b3UiOiJvbmUiLCJ3ZSI6InR3byJ9';

  const output = decoder.decode(encodedInput);

  t.equal(typeof output, 'string');
  t.equal(input, output);
});

test('encode test', (t) => {
  t.plan(2);

  const obj = {
    one: 'Hello',
    two: 'WAES',
  };

  const output = decoder.encode(obj);

  t.equal(typeof output, 'string');
  t.equal(output, 'eyJvbmUiOiJIZWxsbyIsInR3byI6IldBRVMifQ==');
});

test('diff test, Same size but different', (t) => {
  t.plan(1);

  const leftOutput = '{"one":"hello","two":"waes"}';

  const rightOutput = '{"one":"hello","two":"moto"}';

  const result = decoder.diffFiles(rightOutput, leftOutput);
  const expected = {
    message: 'Same size but different',
    result: [
      {
        type: 'update',
        key: 'two',
        value: 'waze',
        oldValue: 'waes'
      }
    ]
  }
  t.notEqual(result, expected);
});

test('diff test, inputs are equal', (t) => {
  t.plan(1);

  const leftOutput = '{"one":"hello","two":"waes"}';

  const rightOutput = '{"one":"hello","two":"waes"}';

  const result = decoder.diffFiles(rightOutput, leftOutput);
  const expected = {
    message: 'inputs are equal'
  };
  t.deepEqual(result, expected);
});

test('diff test, Not of equal size', (t) => {
  t.plan(1);

  const leftOutput = '{"one":"hello","two":"waes"}';

  const rightOutput = '{"one":"hello","two":"moto","three":"donut"}';

  const result = decoder.diffFiles(rightOutput, leftOutput);
  const expected = {
    message: 'Not of equal size'
  }
  t.deepEqual(result, expected);
});

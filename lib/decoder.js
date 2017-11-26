const fs = require('fs');
const path = require('path');
const change = require('diff-json');

// Decode from base64 to string
function decode(data) {
  return (new Buffer(data, 'base64')).toString();
}

// Encode json object, into base64 strings
function encode(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

function createFile(direction, name, content) {
  fs.writeFileSync(path.resolve(__dirname, '../assets/', `${name}-${direction}`), content);
}

function readFile(fileId, direction) {
  return fs.readFileSync(path.resolve(__dirname, '../assets/', `${fileId}-${direction}`));
}

// Main function to compare files, using diff-json package
function diffFiles(rightFile, leftFile) {
  const dRight = JSON.parse(rightFile);
  const dLeft = JSON.parse(leftFile);
  const result = change.diff(dLeft, dRight);

  let response = {};
  if (result instanceof Array && result.length === 0) {
    response = {
      message: 'inputs are equal',
    };
  } else if (result.find(item => item.type === 'add')) {
    response = {
      message: 'Not of equal size',
    };
  } else if (result[0].type === 'update') {
    response = {
      message: 'Same size but different',
      result,
    };
  }
  return response;
}

module.exports = {
  decode,
  encode,
  createFile,
  readFile,
  diffFiles,
};

'ust strict';

var assert = require('assert');
var read = require('./');

describe('read-file', function () {
  it('should read the file synchronously:', function () {
    assert.equal(read.sync('fixtures/a.txt'), 'FILE CONTENTS!!!');
  });

  it('should read the file:', function (done) {
    read('fixtures/a.txt', function (err, str) {
      assert.equal(str, 'FILE CONTENTS!!!');
      done();
    });
  });
});
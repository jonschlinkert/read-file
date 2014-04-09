/**
 * read-file <https://github.com/assemble/read-file>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const fs = require('graceful-fs');
const os = require('os');
const async = require('async');
const file = module.exports = {};

// Normalize to newlines
file.normalizeNL = function(str) {
  return str.replace(/\r\n|\n/g, '\n');
};

file.preserveBOM = false;
file.stripBOM = function(str) {
  // Transform EOL
  var contents = (os.EOL === '\n') ? str : str.replace(os.EOL, '\n');
  // Strip UTF BOM
  if (!file.preserveBOM && contents.charCodeAt(0) === 0xFEFF) {
    contents = contents.substring(1);
    contents = contents.replace(/^\uFEFF/, '');
  }
  return contents;
};


// Read file synchronously
file.readFileSync = function(filepath, enc) {
  enc = enc || 'utf8';
  var buffer = fs.readFileSync(String(filepath), enc);
  try {
    return file.stripBOM(buffer);
  } catch (err) {
    err.message = 'Failed to read "' + filepath + '": ' + err.message;
    throw err;
  }
};


// Read file async
file.readFile = function (filepath, enc, callback) {
  if (enc && typeof enc === 'function') {
    callback = enc;
    enc = 'utf8';
  }

  async.waterfall([

    function (next) {
      fs.readFile(String(filepath),  (enc || 'utf8'), next);
    }, function (contents, next) {
      try {
        next(null, file.stripBOM(contents));
      } catch (err) {
        err.message = 'Failed to read "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
    callback);
};
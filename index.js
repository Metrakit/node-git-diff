var exec     = require('child_process').exec;
var path     = require('path');
var fs       = require('fs');
var mkdirp   = require('mkdirp');
var readline = require('readline');

module.exports = function(opt) {

  var full_path = path.join(__dirname, '../../' + opt.deploy_path + '/');

  var file_path = full_path + 'commits.txt';

  mkdirp(full_path);

  var cmd = 'git diff --name-only --diff-filter=ACMR ' + opt.commits.from + ' ' + opt.commits.to + ' > ' + file_path;

  exec(cmd, function(error, stdout, stderr) {
     var rd = readline.createInterface({
        input: fs.createReadStream(file_path),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', function(line) {
      var onlyPath = require('path').dirname(line);
      fs.exists(line, function(exists) {
        if (exists) {
          mkdirp(full_path + onlyPath, function() {
            fs.createReadStream(line).pipe(fs.createWriteStream(full_path + line));
          });
        }
      });

    });
  });

};
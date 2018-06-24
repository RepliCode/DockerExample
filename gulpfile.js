var gulp = require('gulp');
var dockerCmdJs = require('docker-cmd-js');
var cmd = new dockerCmdJs.Cmd();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var filePath = path.join(__dirname, './Container/exec.js');
var dockerPath = path.join(__dirname, './Container/Dockerfile');
var gulp = require('gulp');

const textFile = "console.log('Made it with gulp!!!')"

function writefile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, textFile, function (err) {
      if (err) {
        reject(err);
      }
      console.log("The file was saved!");
      resolve(null);
    });
  })
}

let callback = async function () {
  // place code for your default task here
  console.log('This is brought to you by gulp')

  await writefile();

  console.log('This is after our await')
}


gulp.task('first', callback);

// gulp.task('deploy', ['first'], () => {
  
// })

gulp.task('default', ['first'], function () {
  cmd.image.build('with-gulp:latest', {
    file: dockerPath
  })
  .then(() => {
    return cmd.run('docker run with-gulp:latest')
  })
  .then((stdout) => {
    console.log(stdout.slice(0,-2));
    console.log('This happened after deploy')
  })
});

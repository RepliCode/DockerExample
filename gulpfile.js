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

gulp.task('deploy', ['first'], () => {
  cmd.image.build('with-gulp:latest', {
      file: dockerPath
    })
    .then(() => cmd.run('docker run -p 8000:8000 with-gulp:latest'))
})

gulp.task('default', ['first', 'deploy'], function () {
  console.log('This happened after deploy')
});

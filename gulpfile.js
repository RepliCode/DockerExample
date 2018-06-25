var gulp = require('gulp');
var dockerCmdJs = require('docker-cmd-js');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec, child;

var filePath = path.join(__dirname, './Container/exec.js');
var gulp = require('gulp');

// String of fil to be written
const textFile = "let num = 1;\n let num2 = 1;\n console.log(num + num2);"

//Promisified Async functions
function writefile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, textFile, function (err) {
      if (err) {
        reject(err);
      }
      resolve(null);
    });
  })
}

function imageBuilder() {
  return new Promise((resolve, reject) => {
    exec(`cd Container && docker build . -t with-gulp:latest`, function (err, stdout, stderr) {
      if (err !== null) {
        reject(err);
      }
      resolve(null);
    });
  })
}

function runCode() {
  return new Promise((resolve, reject) => {
    exec(`docker run with-gulp:latest`, function (err, stdout, stderr) {
      if (err !== null) {
        reject(err);
      }
      resolve(stdout);
    });
  })
}

// Callbacks that await the resolution of promises
let writeToExec = async function () {
  await writefile();
}

let buildImage = async function () {
  await imageBuilder();
}

let dockerRun = async function () {
  let output = await runCode();
  console.log(output.slice(0,-2));
}

// Gulp tasks that coordinate the child processes
gulp.task('writeToExec', writeToExec);
gulp.task('buildImage', ['writeToExec'], buildImage);
gulp.task('dockerRun', ['writeToExec', 'buildImage'], dockerRun);

gulp.task('default', ['writeToExec', 'buildImage', 'dockerRun'], function (done){} );
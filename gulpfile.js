var gulp = require('gulp');
var dockerCmdJs = require('docker-cmd-js');
var cmd = new dockerCmdJs.Cmd();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec, child;

var filePath = path.join(__dirname, './Container/exec.js');
var dockerPath = path.join(__dirname, "./Container/Dockerfile");
var gulp = require('gulp');

const textFile = "let num = 1;\n let num2 = 1;\n console.log(num + num2);"

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

function killSwitchEngage() {
  return new Promise((resolve, reject) => {
    exec(`docker kill with-gulp:latest`, function (err, stdout, stderr) {
      if (err !== null) {
        reject(err);
      }
      resolve(stdout);
    });
  })
}



let writeToExec = async function () {
  await writefile();
}

let buildImage = async function () {
  await imageBuilder();
}

let dockerRun = async function () {
  let output = await runCode();
  console.log(output.slice(0,-2))
}

let killDocker = async function () {
  await killSwitchEngage()
}


// async function (done) {
//   let res = 
//   // .then((res) => {
//   //   return cmd.run('docker run with-gulp:latest')
//   // })
//   console.log('before res')
//   console.log('res: ', res)
//   return res

// }

gulp.task('writeToExec', writeToExec);
gulp.task('buildImage', ['writeToExec'], buildImage);
gulp.task('dockerRun', ['writeToExec', 'buildImage'], dockerRun);

gulp.task('default', ['writeToExec', 'buildImage', 'dockerRun'], function (done){} );
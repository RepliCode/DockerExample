var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../Container/exec.js');
var exec = require('child_process').exec;

let child = exec('gulp', function (err, stdout, stderr) {
    console.log(stdout.split('\n').slice(6,-3).join('\n'))
    if(err !== null) {
        console.log('error:', err)
    }
});
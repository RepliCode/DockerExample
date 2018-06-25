var exec = require('child_process').exec, child;

/// Working example of serving up console.logs from docker container code//////
child = exec('node ./exec.js',
    function (error, stdout, stderr) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

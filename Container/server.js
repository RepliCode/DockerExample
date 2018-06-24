var http = require('http');
var path = require('path');
var exec = require('child_process').exec, child;
/// Example of simple http server
// http.createServer(function(req,res){
//     console.log(req.body);
//     res.write('Hello World');
//     res.end();
//     console.log('Running');
// }).listen(8000);

/// Working example of serving up console.logs from docker container code//////
child = exec('node ./Container/exec.js',
    function (error, stdout, stderr) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

///Example of serving up HTML
// http.createServer(function(request, response) {
//     console.log(typeof requestsave)
//     var filePath = path.join(__dirname, 'index.html');
//     var stat = fileSystem.statSync(filePath);

//     response.writeHead(200, {
//         'Content-Type': 'html',
//         'Content-Length': stat.size
//     });

//     var readStream = fileSystem.createReadStream(filePath);
//     // We replaced all the event handlers with a simple call to readStream.pipe()
//     readStream.pipe(response);
// })
// .listen(8000);

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../Container/exec.js');
var gulp = require('gulp');

const textFile = "let num1 = 3 \nlet num3 = 2\n num1 + num3 "

fs.writeFile(filePath, textFile, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});





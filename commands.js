const fs = require('fs');
const request = require('request');

module.exports = {
  pwd: function(stdin, args, done){ done(process.env.PWD); },

  ls: function(stdin, args, done){
      let returnString = "";

      fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
          returnString += file.toString() + "\n";
        });

      done(returnString);
    });
  },

  echo: function(stdin, args, done){
    returnString = "";

    if (args[0] === "$PATH") {
      done(process.env.PATH);
    } else {
      args.forEach(function(arg){
        returnString += arg + " ";
      });
      done(returnString);
      return returnString;
    }
  },

  cat: function(stdin, args, done){

    fs.readFile(args[0], function(err, data){
      if(err) throw err;
      process.stdout.write(data);
    });
      // process.stdout.write(data[0]);

  },

  head: function(stdin, args, done){
    fs.readFile(args[0], function(err, data){
      let numLines = args[1] || 5;

      if(err) throw err;
      let lines = data.toString().split("\n");

      for (var i = 0; i < numLines; i++) {
        process.stdout.write(lines[i] + "\n");
      }
    });
  },

  tail: function(stdin, args, done){
    fs.readFile(args[0], function(err, data){
      let numLines = args[1] || 5;

      if(err) throw err;
      let lines = data.toString().split("\n");

      let targetLine = lines.length - 1 - numLines;

      for (let i = targetLine; i < lines.length; i++) {
        process.stdout.write(lines[i] + "\n");
      }
    });
  },

  curl: function(stdin, args, done){
    request(args[0], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    });
  }

};

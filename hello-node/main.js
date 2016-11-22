'use trict'

var
    fs = require('fs');
    http = require('http');
    url = require('url');
    path = require('path');

var root = path.resolve('.');

var server = http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    var filePath = path.join(root, pathName);

    fs.stat(filePath, function(err, stats) {

        // if (!err && stats.isFile()) {
        //     response.writeHead(200);
        //     fs.createReadStream(filePath).pipe(response);
        // } else {
        //     response.writeHead(200);
        //     response.end('404 Not Found');
        // }

        if (err) {
            response.writeHead(200);
            console.log('404 Not Found');
        } else if (stats.isFile()) {
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        } else if (stats.isDirectory()) {
            fs.readdir(root, function(err, files) {
                if (err) {
                    console.err(err);
                } else {
                    files.forEach(function(file) {
                        if (file === 'default.pdf') {
                            response.writeHead(200);
                            fs.createReadStream(path.join(root, file)).pipe(response);
                        }
                    });
                }
            });
        }

    });
});

server.listen(8080);
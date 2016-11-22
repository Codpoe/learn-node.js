
const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log('1');
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
        } else if (url.startsWith(DELETE )) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir)
        .filter((f) => {
            return f.endsWith('.js');
        })
        .forEach((f) => {
            let mapping = require(__dirname + '/' + dir + '/' + f);
            addMapping(router, mapping);
            console.log('2');
        });
}

module.exports = function(dir) {
    let
        controllers_dir = dir || 'controllers';
        router = require('koa-router')();
        addControllers(router, controllers_dir);
        return router.routes();
}
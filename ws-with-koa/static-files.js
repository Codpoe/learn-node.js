const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)) {
            let filePath = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(filePath)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(filePath);
                console.log('4');
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;
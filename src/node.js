const http = require('http');
const url = require('url');
const fs = require('fs');
const formidable = require('formidable');

const app = http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname;
    let method = req.method;
    
    //首页
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (!err) {
                res.write(data);
                res.end();
            }
        })
    }
    //图片上传
    if (pathname === '/upload' && method.toLowerCase() === 'post') {
        //parse a file upload
        const form = formidable(
            {
                multiples: true,
                uploadDir: `uploads`,
                keepExtensions: true,

                // filter: function ({ name, originalFilename, mimetype }) {
                //     // keep only images
                //     return mimetype && mimetype.includes("image");
                // }


            });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
                res.end(String(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ fields, files }, null, 2));
        });

        return;
    }
});
app.listen(8080)
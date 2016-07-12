const fs = require('fs');
const redis = require('redis');

var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});


const handler = (req, res) => {
    const url = req.url;
    if(url === '/') {
        fs.readFile(__dirname + '/../public/index.html', (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        })
    } else if (url.includes('/public')) {
        const ext = url.split('.')[1];
        fs.readFile(__dirname + '/..' + url, (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/' + ext});
            res.end(data);
        });
    } else if (url.includes('/set?')) {
        const all = url.split('=')[1];
        const key = all.split('&')[0];
        const param = all.split('&')[1];
        client.set(key, param);
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Added to database');
    } else if (url.includes('/get?')) {
        const key1 = url.split('=')[1];
        client.get(key1, function(err, reply) {
        // reply is null when the key is missing
            res.end(reply);
        });
    } else {
        res.writeHead(404);
        res.end('no comprende bitches');
    }
}

module.exports = handler;

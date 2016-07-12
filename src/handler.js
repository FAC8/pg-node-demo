const fs = require('fs');
const pg = require('pg');

pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, (err, client) => {
//   if (err) throw err;
//
//   console.log('connected to postgres! Getting schemas...');
//
//   client
//     .query('SELECT table_schema, table_name FROM information_schema.tables;')
//     .on('row', (row) => {
//       console.log(JSON.stringify(row));
//     });
// });

const handler = (req, res) => {
    const url = req.url;
    if(url === '/') {
        fs.readFile(__dirname + '/../public/index.html', (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
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
        // client.set(key, param);
        // pg.connect()
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Added to database');
    } else if (url.includes('/get?')) {
        const key1 = url.split('=')[1];
        // client.get(key1, function(err, reply) {
        // // reply is null when the key is missing
        //     res.end(reply);
        // });
        pg.connect(process.env.DATABASE_URL, (err, client) => {
          if (err) throw err;

          console.log('connected to postgres! Getting schemas...');

          client
            .query('SELECT * FROM questions;', (err, answers) => {
              console.log(answers);
              res.end(answers);

              // disconnect the client
              client.end(function (err) {
                if (err) throw err;
              });
            });
        });

    } else {
        res.writeHead(404);
        res.end('no comprende bitches');
    }
};

module.exports = handler;

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

        pg.connect(process.env.DATABASE_URL, (err, client) => {
          if (err) throw err;

          console.log('connected to postgres! Getting schemas...');

          client
            .query('UPDATE questions SET answer = $1::text WHERE key = $2::text;', [param, key], (err, answers) => {
              res.end('');

              // disconnect the client
              client.end(err => {
                if (err) throw err;
              });
            });
        });

        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Added to database');
    } else if (url.includes('/get?')) {
        const key1 = url.split('=')[1];

        pg.connect(process.env.DATABASE_URL, (err, client) => {
          if (err) throw err;

          console.log('connected to postgres! Getting schemas...');

          client
            .query('SELECT answer FROM questions WHERE key = $1::text;', [key1], (err, answers) => {
              res.end(answers.rows[0].answer);

              // disconnect the client
              client.end(err => {
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

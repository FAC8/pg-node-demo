const pg = require('pg');

const connectionString = process.env.HEROKU_POSTGRESQL || 'postgres://localhost:5432/matt_noga';

// instantiate a new client
// the client will read connection information from
// the same environment varaibles used by postgres cli tools
const client = new pg.Client(connectionString);

// connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT * FROM countries WHERE id = $1::int OR id = $2::int', [1, 2], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    console.log(result); // outputs: { name: 'brianc' }

    // disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});


// const pg = require('pg');
//
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/matt_noga';
//
// // const client = new pg.Client(connectionString);
// // create a config to configure both pooling behavior
// // and client options
// // note: all config is optional and the environment variables
// // will be read if the config is not present
// // var config = {
// //   // user: 'foo', //env var: PGUSER
// //   database: 'my_db', //env var: PGDATABASE
// //   // password: 'secret', //env var: PGPASSWORD
// //   // port: 5432, //env var: PGPORT
// //   max: 10, // max number of clients in the pool
// //   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// // };
//
//
// //this initializes a connection pool
// //it will keep idle connections open for a 30 seconds
// //and set a limit of maximum 10 idle clients
// // var pool = new pg.Pool(config);
//
// // to run a query we can acquire a client from the pool,
// // run a query on the client, and then return the client to the pool
// pool.connect(function(err, client, done) {
//   if(err) {
//     return console.error('error fetching client from pool', err);
//   }
//   client.query('SELECT * FROM continents', ['1'], function(err, result) {
//     //call `done()` to release the client back to the pool
//     done();
//
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result);
//     //output: 1
//   });
// });
//
// pool.on('error', function (err, client) {
//   // if an error is encountered by a client while it sits idle in the pool
//   // the pool itself will emit an error event with both the error and
//   // the client which emitted the original error
//   // this is a rare occurrence but can happen if there is a network partition
//   // between your application and the database, the database restarts, etc.
//   // and so you might want to handle it and at least log it out
//   console.error('idle client error', err.message, err.stack)
// })

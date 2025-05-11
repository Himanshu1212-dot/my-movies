import knex from 'knex';
const db = knex({
  client: 'mysql2', // MySQL client
  connection: {
    host: 'localhost',   // Hostname (localhost if your MySQL is on your local machine)
    user: 'root',  // Your MySQL username
    password: '',  // Your MySQL password
    database: 'mymovies',  // Your MySQL database name
  },
});
export default db
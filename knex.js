import knex from "knex";
const knexdb = knex ({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'aluno',
      password: 'senacrs',
      database: 'animais',
    },
  });
  export default knexdb
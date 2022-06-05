// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  production_postgresql: {
    client: 'postgresql',
    connection: {
      hostname: 'localhost',
      database: 'postgres',
      user:     'admin',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production_mysql: {
    client: 'mysql',
    connection: {
      hostname: 'localhost',
      database: 'admin',
      user:     'admin',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

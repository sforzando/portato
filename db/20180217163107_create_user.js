exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.text('mail_address').primary();
    table
      .decimal('quota_size')
      .notNullable()
      .defaultTo(1024.0);
    table.timestamps('created_at').notNullable();
    table.timestamps().notNullable();
    table.enu('status', ['DEAD', 'ALIVE']).defaultTo('ALIVE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

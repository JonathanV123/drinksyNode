
exports.up = async function (knex, Promise) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('email').notNull();
        table.string('password_digest').notNull();
        table.timestamps();
    });
    await knex.schema.createTable('restaurants', (table) => {
        table.increments('owner').unsigned().primary();
        table.string('title');
        table.string('description');
        table.string('drinks');
        table.foreign('owner').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        // Not using timestamp for testing
        // table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('restaurants'),
        knex.schema.dropTable('users'),
    ])
};

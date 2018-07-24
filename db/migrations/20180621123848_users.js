
exports.up = async function (knex, Promise) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.string('email').notNull();
        table.string('password_digest').notNull();
        table.timestamps();
    });
    await knex.schema.createTable('restaurants', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('owner').notNull();
        table.string('title').notNull();
        table.string('description').notNull();
        table.string('food').notNull();
        table.string('beer').notNull();
        table.string('wine').notNull();
        table.string('cocktails').notNull();
        table.string('toStandard').notNull();
        table.string('fromStandard').notNull();
        table.string('toMilitary').notNull();
        table.string('fromMilitary').notNull();
        table.string('fromTimeOfDay').notNull();
        table.string('toTimeOfDay').notNull();
        table.foreign('owner').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('restaurants'),
        knex.schema.dropTable('users'),
    ])
};

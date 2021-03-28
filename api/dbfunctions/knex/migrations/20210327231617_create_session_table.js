
exports.up = function(knex) {
    return knex.schema
    .createTableIfNotExists('session', table => {
        table.integer('user_id').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
        table.string('session_key')
        table.datetime('start_time')
        table.datetime('expire_time')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('session')
};

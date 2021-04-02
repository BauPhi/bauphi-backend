
exports.up = function(knex) {
    return knex.schema.dropTable('attend')
    .createTable('participation', table => {
        table.integer('attendee')
        table.integer('event')
        table.primary(['attendee', 'event'])
    })
};

exports.down = function(knex) {
  
};

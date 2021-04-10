
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('registration_id').defaultTo("notset")
    })
};

exports.down = function(knex) {
  
};


exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('google_uid').defaultTo("notset")
    })
};

exports.down = function(knex) {
  
};

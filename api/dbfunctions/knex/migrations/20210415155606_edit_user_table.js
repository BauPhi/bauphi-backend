
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('google_uid')
    })
    .table('users', function (table) {
        table.string('google_sub_id').defaultTo("notset")
    })
};

exports.down = function(knex) {
  
};


exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.boolean('is_oauth_user').defaultTo(false)
    })
};

exports.down = function(knex) {
  
};

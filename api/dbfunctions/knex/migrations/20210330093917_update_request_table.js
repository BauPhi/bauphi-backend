
exports.up = function(knex) {
    return knex.schema.table('request', function (table) {
        table.dropColumn('claimer')
        table.dropColumn('house')
        table.integer('victim').references('user_id').inTable('users')
        table.integer('home_owner').references('user_id').inTable('users')
        table.integer('home').references('home_id').inTable('home')
    })
};

exports.down = function(knex) {
  
};

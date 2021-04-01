
exports.up = function(knex) {
    return knex.schema.table('request', function (table) {
        table.dropColumn('victim')
        table.dropColumn('home_owner')
        table.dropColumn('home')
    })
    .table('request', function (table) {
        table.integer('victim').references('user_id').inTable('users').onDelete('CASCADE')
        table.integer('home_owner').references('user_id').inTable('users').onDelete('CASCADE')
        table.integer('home').references('home_id').inTable('home').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  
};

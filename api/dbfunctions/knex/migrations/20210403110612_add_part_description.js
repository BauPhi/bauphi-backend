
exports.up = function(knex) {
    return knex.schema.table('participation', function (table) {
        table.string('comment').defaultTo("I am joining.")
    })
};

exports.down = function(knex) {
  
};

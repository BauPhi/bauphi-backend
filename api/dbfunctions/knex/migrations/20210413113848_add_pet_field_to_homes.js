
exports.up = function(knex) {
    return knex.schema.table('home', function (table) {
        table.boolean('is_pets_allowed').defaultTo(false)
    })
};

exports.down = function(knex) {
  
};


exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('userid').primary()
    table.boolean('is_guest').notNullable()
    table.string('firstname').notNullable()
    table.string('surname').notNullable()
    table.string('email')
    table.string('phone')
})


.createTable('home', table => {
    table.increments('home_id').primary()
    table.integer('home_owner').references('userid').inTable('users')
    table.string('home_name')
    table.string('country')
    table.string('area')
    table.string('city')
    table.string('neighbourhood')
    table.float('latitude')
    table.float('longitude')
})

.createTable('request', table => {
    table.integer('claimer').references('userid').inTable('users')
    table.integer('house').references('home_id').inTable('home')
    table.string('description')
    table.string('results')
    table.primary(['claimer', 'house'])
})

.createTable('events', table => {
    table.increments('event_id').primary()
    table.integer('event_starter').references('userid').inTable('users')
    table.date('event_start')
    table.date('event_end')
    table.string('title')
    table.string('description')
})

.createTable('attend', table => {
    table.integer('attendee').references('userid').inTable('users')
    table.integer('the_event').references('event_id').inTable('events')
    table.primary(['attendee', 'the_event'])
})

.createTable('announcement', table => {
    table.increments('announcement_id').primary()
    table.integer('event_starter').references('userid').inTable('users')
    table.binary('image', [2048])
    table.string('phone')
    table.string('title')
    table.string('description')
    table.inherits('events')
})

.createTable('donations', table => {
    table.inherits('events')
})

.createTable('meeting', table => {
    table.boolean('is_emergency')
    table.string('country')
    table.string('area')
    table.string('city')
    table.string('neighbourhood')
    table.float('latitude')
    table.float('longitude')
    table.inherits('events')
})

.createTable('money', table => {
    table.string('currency')
    table.integer('amount')
    table.inherits('donations')
})
.createTable('supply', table => {
    table.string('country')
    table.string('area')
    table.string('city')
    table.string('neighbourhood')
    table.float('latitude')
    table.float('longitude')
    table.inherits('donations')
})
}

exports.down = function(knex) {
    return knex.schema.dropTable('supply')
    .dropTable('meeting')
    .dropTable('money')
    .dropTable('donations')
    .dropTable('announcement')
    .dropTable('request')
    .dropTable('home')
    .dropTable('attend')
    .dropTable('events')
    .dropTable('users')
};
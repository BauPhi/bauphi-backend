
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments('user_id').primary()
    //table.boolean('is_guest').notNullable()
    table.string('name').notNullable()
    table.string('surname').notNullable()
    table.string('email')
    table.string('phone')
    table.string('password')
})


.createTableIfNotExists('home', table => {
    table.increments('home_id').primary()
    table.integer('home_owner').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.string('home_name')
    table.boolean('isVisible')
    table.string('country')
    table.string('state')
    table.string('city')
    table.string('neighbourhood')
    table.float('latitude')
    table.float('longitude')
})

.createTableIfNotExists('request', table => {
    table.integer('claimer').references('user_id').inTable('users')
    table.integer('house').references('home_id').inTable('home')
    table.string('description')
    table.string('results')
    table.primary(['claimer', 'house'])
})

.createTableIfNotExists('events', table => {
    table.increments('event_id').primary()
    table.integer('event_starter').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.date('event_start')
    table.date('event_end')
    table.string('title')
    table.string('description')
})

.createTableIfNotExists('attend', table => {
    table.integer('attendee').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.integer('the_event').references('event_id').inTable('events').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['attendee', 'the_event'])
})

.createTableIfNotExists('announcement', table => {
    table.increments('announcement_id').primary()
    table.integer('ann_starter').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.boolean('isHuman')
    table.binary('image', [2048])
    table.string('phone')
    table.string('title')
    table.string('description')
})

.createTableIfNotExists('donations', table => {
    table.inherits('events')
})

.createTableIfNotExists('meeting', table => {
    table.boolean('is_emergency')
    table.string('country')
    table.string('area')
    table.string('city')
    table.string('neighbourhood')
    table.float('latitude')
    table.float('longitude')
    table.inherits('events')
})

.createTableIfNotExists('money', table => {
    table.string('currency')
    table.integer('amount')
    table.inherits('donations')
})
.createTableIfNotExists('supply', table => {
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

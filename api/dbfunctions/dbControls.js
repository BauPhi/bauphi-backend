
const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123456',
      database : 'bauphi'
    },
    migrations: {
        tableName: 'bauphi1'
      }
  });

const pg = require('knex')({
    client: 'postgres',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
});



  function schemaCreation() {
    knex.schema.createTable('users', table => {
        table.increments('userid')
        table.boolean('is_guest')
        table.string('firstname')
        table.string('surname')
        table.string('email')
        table.string('phone')
        table.uuid('userid').primary()
    })

    knex.schema.createTable('home', table => {
        table.increments('home_id')
        table.foreign('home_owner').references('users.userid')
        table.string('home_name')
        table.string('country')
        table.string('area')
        table.string('city')
        table.string('neighbourhood')
        table.float('latitude')
        table.float('longitude')
        table.uuid('home_id').primary()
    })

    knex.schema.createTable('request', table => {
        table.foreign('claimer').references('users.userid')
        table.foreign('house').references('home.home_id')
        table.string('description')
        table.string('results')
        table.uuid(['claimer', 'house']).primary()
    })

    knex.schema.createTable('events', table => {
        table.increments('event_id')
        table.foreign('event_starter').references('users.userid')
        table.date('event_start')
        table.date('event_end')
        table.string('title')
        table.string('description')
        table.uuid('event_id').primary()
    })

    knex.schema.createTable('attend', table => {
        table.foreign('attendee').references('users.userid')
        table.foreign('the_event').references('events.event_id')
        table.uuid(['attendee', 'the_event']).primary()
    })


    knex.schema.createTable('announcement', table => {
        table.increments('announcement_id')
        table.foreign('event_starter').references('users.userid')
        table.binary('image', [2048])
        table.string('phone')
        table.string('title')
        table.string('description')
        table.inherits('events')
    })

    knex.schema.createTable('donations', table => {
        table.inherits('events')
    })

    knex.schema.createTable('meeting', table => {
        table.boolean('is_emergency')
        table.string('country')
        table.string('area')
        table.string('city')
        table.string('neighbourhood')
        table.float('latitude')
        table.float('longitude')
        table.inherits('donation')
        table.inherits('events')
    })

    knex.schema.createTable('money', table => {
        table.string('currency')
        table.integer('amount')
        table.inherits('donations')
    })

    knex.schema.createTable('supply', table => {
        table.string('country')
        table.string('area')
        table.string('city')
        table.string('neighbourhood')
        table.float('latitude')
        table.float('longitude')
        table.inherits('donation')
    })
  }
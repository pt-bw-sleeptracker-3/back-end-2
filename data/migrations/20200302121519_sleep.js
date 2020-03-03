
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username').notNullable().unique()
      tbl.string('password').notNullable()
      tbl.string('name').notNullable()
      tbl.string('email').notNullable().unique()
  })
  .createTable('sleepData', tbl => {
      tbl.increments()
      tbl.string('date').notNullable()
      tbl.integer('sleepStart').notNullable()
      tbl.integer('sleepEnd')
      tbl.integer('moodMorn')
      tbl.integer('moodMid')
      tbl.integer('moodNight')
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('sleepData')
        .dropTableIfExists('users')
};

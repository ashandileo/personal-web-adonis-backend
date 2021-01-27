'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeSchema extends Schema {
  up () {
    this.create('us', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('us')
  }
}

module.exports = MeSchema

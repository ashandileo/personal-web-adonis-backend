'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TechnologySchema extends Schema {
  up () {
    this.create('technologies', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('technologies')
  }
}

module.exports = TechnologySchema

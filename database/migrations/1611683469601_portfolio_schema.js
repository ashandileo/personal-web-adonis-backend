'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PortfolioSchema extends Schema {
  up () {
    this.create('portfolios', (table) => {
      table.increments()
      table.string('title')
      table.text('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('portfolios')
  }
}

module.exports = PortfolioSchema

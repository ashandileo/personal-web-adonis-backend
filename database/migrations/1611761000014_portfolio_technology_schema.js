'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PortfolioTechnologySchema extends Schema {
  up () {
    this.create('portfolio_technologies', (table) => {
      table.increments()
      table.integer('portfolio_id').unsigned()
      table.foreign('portfolio_id').references('portfolios.id').onDelete('cascade')
      table.integer('technology_id').unsigned()
      table.foreign('technology_id').references('technologies.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('portfolio_technologies')
  }
}

module.exports = PortfolioTechnologySchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PortfolioImagesSchema extends Schema {
  up () {
    this.create('portfolio_images', (table) => {
      table.increments()
      table.text("picture_url")
      table.string("picture_name")
      table.integer('portfolio_id').unsigned()
      table.foreign('portfolio_id').references('portfolios.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('portfolio_images')
  }
}

module.exports = PortfolioImagesSchema

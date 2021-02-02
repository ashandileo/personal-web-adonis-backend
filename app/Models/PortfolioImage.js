'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PortfolioImage extends Model {
  static get table () {
    return 'portfolio_images'
  }

  portfolio () {
    return this.belongsTo("App/Models/Portfolio")
  }
}

module.exports = PortfolioImage

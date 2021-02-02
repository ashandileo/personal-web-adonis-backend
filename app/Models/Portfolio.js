'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Portfolio extends Model {
  technologies () {
    return this
      .belongsToMany('App/Models/Technology')
      .pivotModel('App/Models/PortfolioTechnology')
  }

  portfolioImages () {
    return this
      .hasMany("App/Models/PortfolioImage")
  }
}

module.exports = Portfolio

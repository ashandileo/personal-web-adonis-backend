'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Technology extends Model {
  portfolios () {
    return this
      .belongsToMany('App/Models/Portfolio')
  }
}

module.exports = Technology

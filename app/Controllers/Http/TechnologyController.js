'use strict'

const Technology = use('App/Models/Technology')
class TechnologyController {
  
  async index ({ response }) {
    const technologies = await Technology.all()

    return response.status(200).json({
      data: technologies
    })
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TechnologyController

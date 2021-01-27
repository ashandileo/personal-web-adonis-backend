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
    const { name } = request.post()

    const technology = await Technology.create({ name })

    return response.status(201).json({
      data: technology
    })
  }

  async show ({ params: { id }, request, response, view }) {
    const technology = await Technology.find(id)

    if (!technology) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    return response.status(201).json({
      data: technology
    })
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TechnologyController

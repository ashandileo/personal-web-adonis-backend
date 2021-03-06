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

  async update ({ params: { id }, request, response }) {
    const { name } = request.post()
    const technology = await Technology.find(id)

    if (!technology) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    technology.name = name
    await technology.save()

    return response.status(201).json({
      message: `Successfully updated technology`
    })
  }

  async destroy ({ params: { id }, response }) {
    const technology = await Technology.find(id)

    if (!technology) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    await technology.delete()

    return response.status(201).json({
      message: `Successfully deleted technology`
    })
  }
}

module.exports = TechnologyController

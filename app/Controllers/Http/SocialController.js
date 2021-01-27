'use strict'

const Social = use('App/Models/Social')
class SocialController {
  async index ({ response }) {
    const technologies = await Social.all()

    return response.status(200).json({
      data: technologies
    })
  }

  async store ({ request, response }) {
    const { name, link, picture } = request.post()

    const social = await Social.create({ name, link, picture })

    return response.status(201).json({
      data: social
    })
  }

  async show ({ params: { id }, request, response, view }) {
    const social = await Social.find(id)

    if (!social) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    return response.status(201).json({
      data: social
    })
  }

  async update ({ params: { id }, request, response }) {
    const { name, link, picture } = request.post()
    const social = await Social.find(id)

    if (!social) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    social.name = name
    social.link = link
    social.picture = picture
    await social.save()

    return response.status(201).json({
      message: `Successfully updated social`
    })
  }

  async destroy ({ params: { id }, response }) {
    const social = await Social.find(id)

    if (!social) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    await social.delete()

    return response.status(201).json({
      message: `Successfully deleted social`
    })
  }
}

module.exports = SocialController

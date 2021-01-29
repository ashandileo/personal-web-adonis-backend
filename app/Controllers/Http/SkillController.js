'use strict'

const Skill = use('App/Models/Skill')
class SkillController {
  async index ({ response }) {
    const skills = await Skill.all()

    return response.status(200).json({
      data: skills
    })
  }

  async store ({ request, response }) {
    const { name, picture, picture_name } = request.post()

    const skill = await Skill.create({ name, picture, picture_name })

    return response.status(201).json({
      data: skill
    })
  }

  async show ({ params: { id }, request, response, view }) {
    const skill = await Skill.find(id)

    if (!skill) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    return response.status(201).json({
      data: skill
    })
  }

  async update ({ params: { id }, request, response }) {
    const { name, picture } = request.post()
    const skill = await Skill.find(id)

    if (!skill) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    skill.name = name
    skill.picture = picture
    await skill.save()

    return response.status(201).json({
      message: `Successfully updated skill`
    })
  }

  async destroy ({ params: { id }, response }) {
    const skill = await Skill.find(id)

    if (!skill) {
      return response.status(404).json({
        data: "Data not found"
      })
    }

    await skill.delete()

    return response.status(201).json({
      message: `Successfully deleted skill`
    })
  }
}

module.exports = SkillController

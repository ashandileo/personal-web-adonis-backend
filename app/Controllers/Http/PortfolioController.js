'use strict'

const Portfolio = use('App/Models/Portfolio')
const PortfolioTechnology = use('App/Models/PortfolioTechnology')

class PortfolioController {
  
  async index ({ response }) {
    const portfolios = await 
      Portfolio.query().with('technologies').fetch()

    return response.status(200).json({
      data: portfolios
    })
  }


  async store ({ request, response }) {
    const { title, content, picture, technologies_ids } = request.post()
    
    const portfolio = await Portfolio.create({ title, content, picture })

    technologies_ids.length > 0 && technologies_ids.map(async id => {
      await PortfolioTechnology.create({
        portfolio_id: portfolio.id,
        technology_id: id
      })
    })

    return response.status(201).json({
      data: {
        portfolio: portfolio,
        technologies_ids: technologies_ids
      }
    })
  }


  async show ({ params: { id }, request, response, view }) {
    const portfolio = await 
      Portfolio
      .query()
      .where('id', id)
      .with('technologies')
      .first()

    return response.status(200).json({
      data: portfolio
    })
  }


  async update ({ params: { id }, request, response }) {
    const { title, content, picture, technologies_ids } = request.post()
    const portfolio = await Portfolio.find(id)

    if (!portfolio) {
      return response.status(404).json({
        message: 'Data not found'
      })
    }

    await portfolio.technologies().detach()

    portfolio.title = title
    portfolio.content = content
    portfolio.picture = picture
    await portfolio.save()
    
    technologies_ids.length > 0 && technologies_ids.map(async id => {
      await PortfolioTechnology.create({
        portfolio_id: portfolio.id,
        technology_id: id
      })
    })

    return response.status(200).json({
      message: `Successfully updated portfolio`
    })
  }

  async destroy ({ params: { id }, response }) {
    const portfolio = await Portfolio.find(id)

    if (!portfolio) {
      return response.status(404).json({
        message: 'Data not found'
      })
    }

    await portfolio.delete()

    return response.status(200).json({
      message: `Successfully deleted portfolio`
    })
  }
}

module.exports = PortfolioController
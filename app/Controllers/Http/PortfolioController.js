'use strict'

const Portfolio = use('App/Models/Portfolio')
const PortfolioTechnology = use('App/Models/PortfolioTechnology')
const PortfolioImage = use('App/Models/PortfolioImage')

class PortfolioController {
  
  async index ({ response }) {
    const portfolios = await 
      Portfolio.query().with('technologies').with('portfolioImages').fetch()

    return response.status(200).json({
      data: portfolios
    })
  }


  async store ({ request, response }) {
    const { title, content, images, technologies_ids } = request.post()
    
    const portfolio = await Portfolio.create({ title, content })

    technologies_ids.length > 0 && technologies_ids.map(async id => {
      await PortfolioTechnology.create({
        portfolio_id: portfolio.id,
        technology_id: id
      })
    })

    images.length > 0 && images.map(async image => {
      await PortfolioImage.create({
        picture_url: image.picture_url,
        picture_name: image.picture_name,
        portfolio_id: portfolio.id
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
    const { title, content, images, technologies_ids } = request.post()
    const portfolio = await Portfolio.find(id)

    if (!portfolio) {
      return response.status(404).json({
        message: 'Data not found'
      })
    }

    await portfolio.technologies().detach()
    await portfolio.portfolioImages().detach()

    portfolio.title = title
    portfolio.content = content
    await portfolio.save()
    
    technologies_ids.length > 0 && technologies_ids.map(async id => {
      await PortfolioTechnology.create({
        portfolio_id: portfolio.id,
        technology_id: id
      })
    })

    images.length > 0 && images.map(async image => {
      await PortfolioImage.create({
        picture_url: image.picture_url,
        picture_name: image.picture_name,
        portfolio_id: portfolio.id
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

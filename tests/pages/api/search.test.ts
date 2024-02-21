import handler from '../../../src/pages/api/search.jsx'
import candidateService from '../../../src/services/candidate.service.js'
import { NextApiRequest, NextApiResponse } from 'next'

const mockResponse = () => {
  const res: Partial<NextApiResponse> = {
    status: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
  }
  return res as NextApiResponse
}

describe('handler', () => {
  it('should return 405 if request method is not GET', async () => {
    const req = { method: 'POST' } as NextApiRequest
    const res = mockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
  })

  it('should return 400 if skills are missing or not a string', async () => {
    const req = { method: 'GET', query: {} } as NextApiRequest
    const res = mockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Dados de solicitação inválidos.' })
  })

  it('should call searchCandidates method from candidateService and return 200 on success', async () => {
    const req = { method: 'GET', query: { skills: 'JavaScript,React' } } as NextApiRequest
    const res = mockResponse()

    const searchCandidatesMock = jest.spyOn(candidateService, 'searchCandidates').mockResolvedValueOnce({ id: '1', name: 'John Doe', skills: ['JavaScript', 'React'] })

    await handler(req, res)

    expect(searchCandidatesMock).toHaveBeenCalledWith(['JavaScript', 'React'])
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'John Doe', skills: ['JavaScript', 'React'] })
  })

  it('should return 404 if no matching candidate is found', async () => {
    const req = { method: 'GET', query: { skills: 'Java,Spring' } } as NextApiRequest
    const res = mockResponse()

    const searchCandidatesMock = jest.spyOn(candidateService, 'searchCandidates').mockResolvedValueOnce(null)

    await handler(req, res)

    expect(searchCandidatesMock).toHaveBeenCalledWith(['Java', 'Spring'])
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Nenhum candidato correspondente encontrado.' })
  })

  it('should return 500 if an error occurs while searching candidates', async () => {
    const req = { method: 'GET', query: { skills: 'JavaScript,React' } } as NextApiRequest
    const res = mockResponse()

    jest.spyOn(candidateService, 'searchCandidates').mockRejectedValueOnce(new Error('Database error'))

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor.' })
  })
})

import { NextApiRequest, NextApiResponse } from 'next'
import handler from '../../../src/pages/api/candidates'
import candidateService from '../../../src/services/candidate.service.js'

const mockResponse = () => {
  const res: Partial<NextApiResponse> = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.end = jest.fn().mockReturnValue(res)
  return res as NextApiResponse
}

describe('handler', () => {
  it('should return 405 if request method is not POST', async () => {
    const req = { method: 'GET' } as NextApiRequest
    const res = mockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
  })

  it('should return 400 if request body is missing name or skills', async () => {
    const req = { method: 'POST', body: {} } as NextApiRequest
    const res = mockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Dados de solicitação inválidos.' })
  })

  it('should return 400 if skills are empty', async () => {
    const req = { method: 'POST', body: { name: 'John Doe', skills: '' } } as NextApiRequest
    const res = mockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Dados de solicitação inválidos.' })
  })

  it('should call addCandidate method from candidateService and return 200 on success', async () => {
    const req = { method: 'POST', body: { name: 'John Doe', skills: 'JavaScript, React' } } as NextApiRequest
    const res = mockResponse()

    const addCandidateMock = jest.spyOn(candidateService, 'addCandidate').mockResolvedValueOnce()

    await handler(req, res)

    expect(addCandidateMock).toHaveBeenCalledWith({ name: 'John Doe', skills: ['JavaScript', 'React'] })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Candidato adicionado com sucesso.' })
  })

  it('should return 500 if an error occurs while adding candidate', async () => {
    const req = { method: 'POST', body: { name: 'John Doe', skills: 'JavaScript, React' } } as NextApiRequest
    const res = mockResponse()

    jest.spyOn(candidateService, 'addCandidate').mockRejectedValueOnce(new Error('Database error'))

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor.' })
  })
})

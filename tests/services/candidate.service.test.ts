import candidateService from '../../src/services/candidate.service.js'
import { catho } from '../../src/services/db.js'

jest.mock('../../src/services/db', () => ({
  catho: {
    query: jest.fn()
  }
}))

describe('candidateService', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
  
    describe('addCandidate', () => {
      it('should add candidate to the database', async () => {
        const mockCandidate = {
          name: 'John Doe',
          skills: ['JavaScript', 'React']
        }
  
        await candidateService.addCandidate(mockCandidate)
  
        expect(catho.query).toHaveBeenCalledWith(
          'INSERT INTO candidates (id, name, skills) VALUES (?, ?, ?)',
          expect.any(Array)
        )
      })
  
      it('should return validation errors if candidate data is invalid', async () => {
        const mockCandidate = {
          name: '',
          skills: []
        }
  
        const validationErrors = await candidateService.addCandidate(mockCandidate)
  
        expect(validationErrors).toEqual(expect.objectContaining({
          name: 'É necessário informar o nome do candidato',
          skills: ['É necessário adicionar ao menos uma skill ao candidato'],
          message: 'Houve erros de validação. Por favor, corrija-os.'
        }))
        expect(catho.query).not.toHaveBeenCalled()
      })
  
      it('should throw an error if there is an issue with adding candidate to the database', async () => {
        catho.query.mockRejectedValueOnce(new Error('Database error'))
  
        const mockCandidate = {
          name: 'John Doe',
          skills: ['JavaScript', 'React']
        }
  
        await expect(candidateService.addCandidate(mockCandidate)).rejects.toThrow('Falha ao salvar candidato. Verifique os dados fornecidos.')
      })
    })
  
    describe('searchCandidates', () => {
      it('should return null if no candidates are found', async () => {
        catho.query.mockImplementationOnce((query, callback) => {
          callback(null, [])
        })
  
        const result = await candidateService.searchCandidates(['JavaScript', 'React'])
  
        expect(result).toBeNull()
      })
  
      it('should return the matched candidate based on skills', async () => {
        const mockCandidates = [
          { id: '1', name: 'John Doe', skills: 'JavaScript, React' },
          { id: '2', name: 'Jane Doe', skills: 'Java, Spring' }
        ]
  
        catho.query.mockImplementationOnce((query, callback) => {
          callback(null, mockCandidates)
        })
  
        const result = await candidateService.searchCandidates(['React', 'Spring'])
  
        expect(result).toEqual({
          id: '1',
          name: 'John Doe',
          skills: ['JavaScript', 'React']
        })
      })
  
      it('should throw an error if there is an issue with searching for candidates', async () => {
        catho.query.mockImplementationOnce((query, callback) => {
          callback(new Error('Database error'), null)
        })
  
        await expect(candidateService.searchCandidates(['JavaScript', 'React'])).rejects.toThrow('Database error')
      })
    })
  })
import { catho } from "./db"
import { Candidate, CandidateRequest, CandidateResponse, CandidateReturn } from "../models/candidate.model"
import { v4 as uuidv4 } from 'uuid'

const validateCandidate = (candidate: CandidateRequest) => {
    const errors: any = {}
    if (!candidate.name) {
        errors.name = 'É necessário informar o nome do candidato'
    }
    if (!candidate.skills || candidate.skills.length === 0) {
        errors.skills = ['É necessário adicionar ao menos uma skill ao candidato']
    }
    if (Object.keys(errors).length > 0) {
        errors.message = 'Houve erros de validação. Por favor, corrija-os.'
    }
    return errors
}

const candidateService = {
    addCandidate: async (candidate: CandidateRequest): Promise<void | any> => {
        try {
            const validationErrors = validateCandidate(candidate)
            if (Object.keys(validationErrors).length > 0) {
                return validationErrors
            }

            const id = uuidv4()
            const skillsString = candidate.skills.join(', ')

            await catho.query(
                'INSERT INTO candidates (id, name, skills) VALUES (?, ?, ?)',
                [id, candidate.name, JSON.stringify(skillsString)]
            )
        } catch (error) {
            console.error('Erro ao adicionar candidato:', error)
            throw new Error('Falha ao salvar candidato. Verifique os dados fornecidos.')
        }
    },

    searchCandidates: async (skills: string[]): Promise<CandidateResponse | null> => {
        try {
            const candidates: CandidateReturn[] = await new Promise((resolve, reject) => {
                catho.query('SELECT * FROM candidates', (error: Error | null, results: CandidateReturn[]) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }
                })
            })
    
            if (!candidates.length) {
                console.log('Nenhum candidato encontrado.')
                return null
            }
    
            let matchedCandidate: CandidateResponse | null = null
            let maxSkillsCovered = -1
    
            for (const candidate of candidates) {
                const candidateSkills = candidate.skills.split(',').map(skill => skill.replace(/"/g, '').trim())
    
                const coveredSkills = candidateSkills.filter(skill => skills.includes(skill)).length
    
                if (coveredSkills > maxSkillsCovered) {
                    maxSkillsCovered = coveredSkills
                    matchedCandidate = {
                        id: candidate.id,
                        name: candidate.name,
                        skills: candidateSkills
                    }
                }
            }

            return matchedCandidate
        } catch (error) {
            console.error('Erro na procura por candidatos:', error)
            throw error
        }
    }
}

export default candidateService

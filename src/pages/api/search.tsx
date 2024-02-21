import candidateService from '@/services/candidate.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end()
        return
    }

    try {
        const { skills } = req.query

        if (!skills || typeof skills !== 'string') {
            res.status(400).json({ error: 'Dados de solicitação inválidos.' })
            return
        }

        const skillsArray = skills.split(',')

        const matchedCandidate = await candidateService.searchCandidates(skillsArray)

        if (matchedCandidate) {
            res.status(200).json(matchedCandidate)
        } else {
            res.status(404).json({ message: 'Nenhum candidato correspondente encontrado.' })
        }
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

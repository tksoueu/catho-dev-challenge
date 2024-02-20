import { NextApiRequest, NextApiResponse } from 'next'
import candidateService from '@/services/candidate.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).end()
      return
    }

    const { name, skills: skillsString } = req.body

    if (!name || !skillsString) {
      res.status(400).json({ error: 'Dados de solicitação inválidos.' })
      return
    }

    const skills = skillsString.split(',').map((skill: string) => skill.trim())

    if (!skills || skills.length === 0) {
      res.status(400).json({ error: 'Dados de solicitação inválidos.' })
      return
    }

    const candidate = {
      name,
      skills
    }

    await candidateService.addCandidate(candidate)

    res.status(200).json({ message: 'Candidato adicionado com sucesso.' })

  } catch (error) {
    console.error('Erro ao adicionar candidato: ', error)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

export interface Candidate {
    id: string
    name: string
    skills: string[]
    skillCount: number
}

export interface CandidateError {
  name?: string
  skills?: string[]
  message?: string
}

export interface CandidateReturn {
  id: string
  name: string
  skills: string
}

export interface CandidateRequest extends Omit<Candidate, 'id' | 'skillCount'> {}
export interface CandidateResponse extends Omit<Candidate, 'skillCount'> {}
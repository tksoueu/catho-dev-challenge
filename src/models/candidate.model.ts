export interface Candidate {
    id: string
    name: string
    skills: string[]
  }

export interface CandidateError {
  name?: string
  skills?: string[]
  message?: string
}

export interface CandidateRequest extends Omit<Candidate, 'id'> {}
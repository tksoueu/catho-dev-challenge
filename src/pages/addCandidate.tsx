"use client"

import CandidateForm from '@/components/candidateForm'
import { toast } from 'react-toastify'
import styles from '@/styles/pages.module.css'
import { Candidate } from '@/models/candidate.model'

function AddCandidatePage() {

  const HandleCandidateSubmit = async (candidate: Candidate) => {
    
    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        body: JSON.stringify(candidate),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar candidato. Por favor, tente novamente.')
      }

      toast.success('Candidato salvo com sucesso!')
    } catch (error: any) {
      toast.error('Erro ao salvar candidato: ' + error.message)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Adicionar Candidato</h1>
        <CandidateForm onSubmit={HandleCandidateSubmit} />
      </div>
    </main>
  )
}

export default AddCandidatePage
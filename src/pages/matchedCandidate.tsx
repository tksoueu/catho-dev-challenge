import React from 'react'
import Modal from 'react-modal'
import styles from '@/styles/pages.module.css'
import { CandidateResponse } from '@/models/candidate.model'

interface CandidateModalProps {
  isOpen: boolean
  onClose: () => void
  candidate: CandidateResponse | null
}

const formatSkills = (skills: string[]) => {
  return skills.join(', ')
}

const CandidateModal: React.FC<CandidateModalProps> = ({ isOpen, onClose, candidate }) => {
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Resultado da busca"
      className={`${styles.modalContent} ${styles.customModal}`}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Resultado da busca de candidatos</h2>
        {candidate && (
          <div className={styles.candidateInfo}>
            <h3>Nome:</h3>
            <p>{candidate.name}</p>
            <h3>Skills:</h3>
            <p>{formatSkills(candidate.skills)}</p>
          </div>
        )}
        <button className={styles.button} onClick={handleCloseModal}>Fechar</button>
      </div>
    </Modal>
  )
}

export default CandidateModal

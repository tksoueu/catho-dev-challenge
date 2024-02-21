import React from 'react'
import styles from '@/styles/pages.module.css'

interface CandidateInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CandidateInput: React.FC<CandidateInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Skill"
      />
    </div>
  )
}

export default CandidateInput

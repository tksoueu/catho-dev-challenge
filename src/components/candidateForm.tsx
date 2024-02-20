"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CandidateInput from './candidateInput'
import styles from '@/styles/pages.module.css'

const CandidateForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState([''])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAddSkill = () => {
    setSkills([...skills, ''])
  }

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  const handleRemoveSkill = (index) => {
    if (skills.length > 1) {
      const newSkills = skills.filter((_, i) => i !== index)
      setSkills(newSkills)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const skillsString = skills.join(', ')

    const validationErrors = validateCandidate({ name, skills })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({ name, skills: skillsString })
      setName('')
      setSkills([''])
      setErrors({})
      toast.success('Candidato salvo com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar candidato: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const validateCandidate = (candidate) => {
    const errors = {}
    if (!candidate.name) {
      errors.name = 'É necessário informar o nome do candidato'
    }
    if (!candidate.skills || candidate.skills.length === 0) {
      errors.skills = 'É necessário adicionar ao menos uma skill ao candidato'
    }
    return errors
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className={styles.inputField}
          error={errors.name}
        />
      </div>
      {skills.map((skill, index) => (
        <div key={index} className={styles.skillContainer}>
          <CandidateInput
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemoveSkill(index)}
            className={styles.removeButton}
          >
            x
          </button>
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={handleAddSkill}
          disabled={isLoading}
          className={styles.addButton}
        >
          Adicionar Skill
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          Salvar Candidato
        </button>
      </div>
      {isLoading && <p className={styles.loadingText}>Cadastrando</p>}
      {errors.message && (
        <p className={styles.errorText}>Erro: {errors.message}</p>
      )}
    </form>
  )
}

export default CandidateForm

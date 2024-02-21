import React, { useState, useEffect } from 'react'
import CandidateInput from '@/components/candidateInput'
import styles from '@/styles/pages.module.css'
import CandidateModal from './matchedCandidate'
import { CandidateResponse } from '@/models/candidate.model'

interface SearchCandidatesProps {
    onSearch: (skills: string[]) => Promise<CandidateResponse | null>
}

const SearchCandidates: React.FC<SearchCandidatesProps> = ({ onSearch }) => {
    const [skills, setSkills] = useState<string[]>([''])
    const [foundCandidate, setFoundCandidate] = useState<CandidateResponse | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleAddSkill = () => {
        setSkills([...skills, ''])
    }

    const handleRemoveSkill = (indexToRemove: number) => {
        if (skills.length > 1) {
            setSkills(skills.filter((_, index) => index !== indexToRemove))
        }
    }

    const handleSkillChange = (index: number, value: string) => {
        setSkills(prevSkills => {
            const newSkills = [...prevSkills]
            newSkills[index] = value
            return newSkills
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        const searchedSkills = skills.filter((skill) => skill.trim().length > 0)
    
        if (searchedSkills.length === 0) {
            setError('Informe ao menos uma habilidade.')
            return
        }
    
        try {
            const skillsQueryParam = searchedSkills.join(',')
            const response = await fetch(`/api/search?skills=${skillsQueryParam}`)
    
            if (response.ok) {
                const matchedCandidate = await response.json()
                setFoundCandidate(matchedCandidate)
                setShowModal(true)
            } else {
                throw new Error('Erro ao buscar candidatos')
            }
        } catch (error) {
            setError('Erro ao buscar candidato. Por favor, tente novamente.')
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setFoundCandidate(null)
    }

    useEffect(() => {
        setFoundCandidate(null)
    }, [skills])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1>Buscar Candidatos</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.skillContainer}>
                            <CandidateInput
                                value={skill}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleSkillChange(index, e.target.value)
                                }
                            />
                            {index !== 0 && (
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveSkill(index)}
                                >
                                    x
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSkill}
                        className={styles.addButton}
                    >
                        Adicionar Skill
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Buscar Candidato
                    </button>
                </form>
                {error && <p className={styles.errorText}>{error}</p>}
                {showModal && foundCandidate && (
                    <CandidateModal
                        candidate={foundCandidate}
                        onClose={closeModal}
                        isOpen={true}
                    />
                )}
            </div>
        </main>
    )
}

export default SearchCandidates

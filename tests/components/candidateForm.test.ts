import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import CandidateForm from '../../src/components/candidateForm.jsx'

describe('CandidateForm', () => {
  it('should render correctly', () => {
    const onSubmit = jest.fn()
    const { getByPlaceholderText, getByText } = render(<CandidateForm onSubmit={onSubmit} />)
    
    // Verifica se os elementos do formulário estão presentes
    expect(getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(getByText('Adicionar Skill')).toBeInTheDocument()
    expect(getByText('Salvar Candidato')).toBeInTheDocument()
  })

  it('should add a new skill field when clicking the "Adicionar Skill" button', () => {
    const onSubmit = jest.fn()
    const { getByText } = render(<CandidateForm onSubmit={onSubmit} />)
    
    const addButton = getByText('Adicionar Skill')
    fireEvent.click(addButton)
    
    expect(document.querySelectorAll('.skill-container').length).toBe(2)
  })

  it('should remove a skill field when clicking the "x" button', () => {
    const onSubmit = jest.fn()
    const { getByText } = render(<CandidateForm onSubmit={onSubmit} />)
    
    const addButton = getByText('Adicionar Skill')
    fireEvent.click(addButton)
    
    const removeButton = getByText('x')
    fireEvent.click(removeButton)
    
    expect(document.querySelectorAll('.skill-container').length).toBe(1)
  })

  it('should call onSubmit function with correct data when form is submitted', async () => {
    const onSubmit = jest.fn().mockResolvedValueOnce()
    const { getByPlaceholderText, getByText } = render(<CandidateForm onSubmit={onSubmit} />)
    
    const nameInput = getByPlaceholderText('Nome')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    const addButton = getByText('Adicionar Skill')
    fireEvent.click(addButton)
    
    const skillInput = getByPlaceholderText('Skill')
    fireEvent.change(skillInput, { target: { value: 'React' } })

    const submitButton = getByText('Salvar Candidato')
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe', skills: 'React' }))
  })
})

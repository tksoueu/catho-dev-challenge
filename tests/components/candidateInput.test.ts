import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CandidateInput from '../../src/components/candidateInput.jsx';

describe('CandidateInput', () => {
  it('should render correctly', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<CandidateInput value="" onChange={handleChange} />);
    
    const inputElement = getByPlaceholderText('Skill');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveValue('');
  });

  it('should call onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<CandidateInput value="" onChange={handleChange} />);
    
    const inputElement = getByPlaceholderText('Skill');
    fireEvent.change(inputElement, { target: { value: 'React' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'React' } }));
  });
});

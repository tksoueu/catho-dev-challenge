const { render, screen } = require('@testing-library/react')
const userEvent = require('@testing-library/user-event')
const Home = require('../../src/pages/index')

describe('Home Page', () => {
  test('renders page title', () => {
    render(<Home />)
    const titleElement = screen.getByText(/Gerenciador de Candidatos/i)
    expect(titleElement).toBeInTheDocument()
  })

  test('renders add candidate button', () => {
    render(<Home />)
    const addButton = screen.getByRole('button', { name: /Adicionar Candidato/i })
    expect(addButton).toBeInTheDocument()
  })

  test('renders search candidates button', () => {
    render(<Home />)
    const searchButton = screen.getByRole('button', { name: /Buscar Candidatos/i })
    expect(searchButton).toBeInTheDocument()
  })

  test('navigates to add candidate page when add candidate button is clicked', () => {
    const { getByRole } = render(<Home />)
    const addButton = getByRole('button', { name: /Adicionar Candidato/i })
    userEvent.click(addButton)
    expect(window.location.pathname).toBe('/addCandidate')
  })

  test('navigates to search candidates page when search candidates button is clicked', () => {
    const { getByRole } = render(<Home />)
    const searchButton = getByRole('button', { name: /Buscar Candidatos/i })
    userEvent.click(searchButton)
    expect(window.location.pathname).toBe('/searchCandidates')
  })
})

import styled from 'styled-components'

export const StyledForm = styled.div`
  background: var(--neutral-light);
  form {
    font-color: var(--text-light);
    margin: auto;
    max-width: 100%;
    display: grid;
    padding: 0 1rem;
    @media (min-width: 1200px) {
      padding: 0 3rem;
    }
  }

  label {
    padding-top: 2rem;
  }

  span {
    font-weight: bold;
    color: var(--accent-dark);
  }
`

import styled from 'styled-components'

export const StyledForm = styled.div`
  background: var(--neutral-light);
  form {
    /* color: var(--text-light); */
    margin: auto;
    max-width: 100%;
    display: grid;
    padding: 0 1rem;
    @media (min-width: 1200px) {
      padding: 0 3rem;
    }
  }

  span,
  .required:after {
    margin: 0 2px;
    font-weight: bold;
    content: '*';
    color: var(--accent-dark);
  }

  label {
    padding-top: 2rem;
    display: inline;
  }
`

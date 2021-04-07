import styled from 'styled-components'

const Button = styled.button`
  margin: 0.5rem auto;
  padding: 1rem 2rem;
  text-align: center;
  background: var(--accent-dark);
  color: var(--text-light);

  &:disabled {
    background: grey;
  }
`

export default Button

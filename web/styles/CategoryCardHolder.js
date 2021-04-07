import styled from 'styled-components'

const CategoryCardHolder = styled.div`
  margin: auto;
  padding: 1rem;
  width: 100vw;
  max-width: 1200px;

  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
`

export default CategoryCardHolder

import React from 'react'
import styled from 'styled-components'
import RenderIcon from '../Icons/RenderIcon'
import { motion } from 'framer-motion'

const CategoryCardStyles = styled(motion.div)`
  display: flex;
  align-items: center;

  padding: 2px;
  border: ${(props) =>
    props.selected ? '2px solid var(--accent-dark)' : 'none'};
  border-radius: 20px;
  color: ${(props) =>
    props.selected ? 'var(--accent-dark)' : 'var(--text-light)'};
  font-weight: normal;

  svg {
    height: 45px;
    width: 45px;
    margin: 0 0.25rem;
  }

  path {
    fill: ${(props) =>
      props.selected ? 'var(--accent-dark)' : 'var(--text-light)'};
  }

  :hover {
    color: var(--accent-dark);
    path {
      fill: var(--accent-dark);
    }
  }
`
const CategoryCard = ({ category, selected, setActiveFilters }) => {
  const { _id, title, icon } = category
  return (
    <CategoryCardStyles
      selected={selected}
      whileHover={{
        scale: 1.1,
      }}
      onClick={() => {
        setActiveFilters([_id])
      }}
    >
      <RenderIcon iconName={icon} />
      {title}
    </CategoryCardStyles>
  )
}

export default CategoryCard

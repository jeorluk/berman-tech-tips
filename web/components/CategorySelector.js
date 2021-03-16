import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import CategoryCard from './CategoryCard'
import { FilterContext } from '../context/filterContext'

const CategorySelectorStyles = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;

  display: grid;
  grid-template-columns: 60px 1fr;
`

const CategoriesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  justify-content: center;
  justify-items: left;
`

const ClearFilterHolder = styled.div`
  width: 100%;
  height: 45px;
  text-align: center;
  align-self: center;
`

const ClearFilterButton = styled.button`
  font-weight: bold;
  font-family: 'Rock Salt', cursive;
  background: red;
  color: white;
  border-radius: 50%;
  line-height: 45px;
  height: 45px;
  width: 45px;

  &:hover {
    transform: scale(1.1);
  }
`
const CategorySelector = ({ categoryList }) => {
  const { activeFilters, setActiveFilters } = useContext(FilterContext)
  return (
    <CategorySelectorStyles>
      {activeFilters.length > 0 ? (
        <ClearFilterHolder>
          <ClearFilterButton
            className='text_large'
            title='Clear Filter'
            ariaLabel='Clear Filter'
            onClick={() => setActiveFilters([])}
          >
            x
          </ClearFilterButton>
        </ClearFilterHolder>
      ) : (
        <div></div>
      )}
      <CategoriesContainer
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial='hidden'
        animate='visible'
      >
        {categoryList.map((category) => {
          return (
            <motion.div
              key={category._id}
              variants={{
                hidden: {
                  scale: 0.5,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { ease: 'easeOut' },
                },
              }}
            >
              <CategoryCard
                selected={activeFilters.includes(category._id)}
                category={category}
                setActiveFilters={setActiveFilters}
              />
            </motion.div>
          )
        })}
      </CategoriesContainer>
    </CategorySelectorStyles>
  )
}

export default CategorySelector

import { useState, createContext } from 'react'

const FilterContext = createContext()

const FilterContextProvider = (props) => {
  const [activeFilters, setActiveFilters] = useState([])

  return (
    <FilterContext.Provider value={{ activeFilters, setActiveFilters }}>
      {props.children}
    </FilterContext.Provider>
  )
}

export { FilterContext, FilterContextProvider }

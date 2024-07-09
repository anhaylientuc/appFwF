// src/context/FilterContext.js
import React, { createContext, useState } from 'react'

export const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState([])

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterContext.Provider>
  )
}

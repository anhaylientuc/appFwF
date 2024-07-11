// src/context/FilterContext.js
import React, { createContext, useState } from 'react'

export const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState([])
  const [_category_id, set_category_id] = useState(null)
  return (
    <FilterContext.Provider value={{ filterState, setFilterState,_category_id,set_category_id }}>
      {children}
    </FilterContext.Provider>
  )
}

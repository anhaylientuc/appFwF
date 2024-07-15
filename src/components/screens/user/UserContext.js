import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined) // chua login
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserContext

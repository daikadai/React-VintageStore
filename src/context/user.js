// user context
import React from 'react'

const UserContext = React.createContext();

function UserProvider({ children }) {
  return (
    <UserContext.Provider value="user">
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
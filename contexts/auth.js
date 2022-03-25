import { createContext, useContext } from "react"

export const AuthContext = createContext({})

export const useAuth = () => {
  const user = useContext(AuthContext)

  return { user }
}

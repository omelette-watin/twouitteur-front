import { createContext, useContext, useState, useEffect } from "react"
import api from "@/services/api"
import { useRouter } from "next/router"

export const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("token")
      api.defaults.headers["x-access-token"] = token

      if (token) {
        try {
          const { data } = await api.get("/user/me")

          if (data) {
            setUser(data)
            setLoading(false)
          }
        } catch (e) {
          localStorage.removeItem("token")
          setLoading(false)
        }
      }

      setLoading(false)
    })()
  }, [router])

  return <AppContext.Provider {...props} value={{ user, setUser, loading }} />
}

import "../styles/globals.css"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import api from "../services/api"
import { AuthContext } from "../contexts/auth"
import ConnectionScreen from "../components/ConnectionScreen"

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const me = await api.get("/user/me")

          if (me) {
            setUser(me)
            setLoading(false)
          }
        } catch (e) {
          localStorage.removeItem("token")
          setLoading(false)
        }
      }

      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!user && pageProps.protected) {
    return <ConnectionScreen />
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default App

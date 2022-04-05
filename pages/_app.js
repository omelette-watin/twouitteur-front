import "../styles/globals.css"
import { useEffect, useState } from "react"
import LoadingPage from "../components/LoadingPage"
import api from "../services/api"
import { AuthContext } from "../contexts/auth"
import ConnectionScreen from "../components/ConnectionScreen"
import Layout from "../components/Layout"

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  if (!user && !pageProps.unprotected) {
    return <ConnectionScreen />
  }

  if (pageProps.unprotected) {
    return (
      <AuthContext.Provider value={user}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={user}>
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}

export default App

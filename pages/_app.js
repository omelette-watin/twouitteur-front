import "../styles/globals.css"
import { useState } from "react"
import Loading from "../components/Loading"

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  if (loading) {
    return <Loading />
  }

  return <Component {...pageProps} />
}

export default MyApp

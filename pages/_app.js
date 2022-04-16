import "@/styles/globals.css"
import LoadingPage from "@/components/LoadingPage"
import { AppContextProvider, useAppContext } from "@/components/AppContext"
import ConnectionScreen from "@/components/ConnectionScreen"
import Layout from "@/components/Layout"
import { TweetModalProvider } from "@/components/TweetModalContext"
import { TweetPostedProvider } from "@/components/TweetPostedContext"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import { EditProfileProvider } from "@/components/EditProfileContext"

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

const AppContent = ({ Component, pageProps, ...otherProps }) => {
  const { user, loading } = useAppContext()

  if (loading) {
    return <LoadingPage />
  }

  if (!user && !pageProps.unprotected) {
    return <ConnectionScreen />
  }

  if (pageProps.unprotected) {
    return <Component {...pageProps} />
  }

  return (
    <TweetPostedProvider>
      <TweetModalProvider>
        <EditProfileProvider>
          <Layout title={pageProps.title}>
            <Component {...pageProps} {...otherProps} />
          </Layout>
        </EditProfileProvider>
      </TweetModalProvider>
    </TweetPostedProvider>
  )
}
const App = (props) => (
  <AppContextProvider>
    <AppContent {...props} />
  </AppContextProvider>
)

export default App

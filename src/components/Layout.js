import Head from "next/head"
import Sidebar from "./Sidebar"
import MobileBar from "./MobileBar"
import { useTweetModal } from "./TweetModalContext"
import TweetModal from "./TweetModal"

const Layout = ({ title, children }) => {
  const { tweetModal } = useTweetModal()

  return (
    <>
      <Head>
        <title>{title ? `${title} / ` : ""}Twouitteur </title>
      </Head>
      {tweetModal.visible && <TweetModal />}
      <main className="mx-auto flex min-h-screen max-w-[1500px]">
        <Sidebar />
        <MobileBar />

        {children}
      </main>
    </>
  )
}

export default Layout

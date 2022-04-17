import Head from "next/head"
import Sidebar from "./Sidebar"
import MobileBar from "./MobileBar"
import { useTweetModal } from "./TweetModalContext"
import TweetModal from "./TweetModal"
import classNames from "classnames"
import { useTweetPosted } from "./TweetPostedContext"
import Link from "next/link"
import { useEditProfile } from "./EditProfileContext"
import EditProfileModal from "./EditProfileModal"

const Layout = ({ title, children }) => {
  const { tweetModal } = useTweetModal()
  const { newTweetId } = useTweetPosted()
  const { editModal } = useEditProfile()

  return (
    <>
      <Head>
        <title>{title ? `${title} / ` : ""}Twouitteur </title>
      </Head>
      {tweetModal.visible && <TweetModal />}
      {editModal && <EditProfileModal />}
      <main className="mx-auto flex min-h-screen max-w-[1500px]" id="main">
        <Sidebar />
        <MobileBar />
        <p
          className={classNames(
            "bg-twitter fixed bottom-24 left-1/2 z-50 w-fit -translate-x-1/2 transform space-x-3 rounded-lg py-3 px-4 text-xs text-white shadow-sm shadow-black/90 sm:bottom-8 lg:text-base",
            {
              hidden: !newTweetId,
            }
          )}
        >
          <span>Your tweet was sent.</span>
          <Link href={`/status/${newTweetId}`}>
            <a className="font-bold hover:underline">View</a>
          </Link>
        </p>
        {children}
      </main>
    </>
  )
}

export default Layout

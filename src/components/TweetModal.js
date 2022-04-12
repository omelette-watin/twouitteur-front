import { TweetBoxModal } from "./TweetBox/TweetBox"
import { useTweetModal } from "./TweetModalContext"
import { XIcon } from "@heroicons/react/outline"
import { MinimalTweet } from "./Tweet"

const TweetModal = () => {
  const { tweetModal, setTweetModal } = useTweetModal()
  const handleCloseTweetModal = () =>
    setTweetModal({ replying: false, visible: false })

  return (
    <div className="fixed z-50 flex h-screen w-screen items-start justify-center bg-black sm:bg-black/70 sm:pt-24">
      <div className="z-40 flex w-full flex-col rounded-xl border-white bg-black p-4 text-white shadow-neutral-800 sm:w-[600px] sm:border-[1px] sm:shadow-lg xl:w-[700px]">
        <button
          onClick={handleCloseTweetModal}
          className="self-start rounded-full p-2  hover:bg-[#d9d9d9] hover:bg-opacity-10"
        >
          <XIcon color="white" height={20} width={20} />
        </button>
        {tweetModal.replying && (
          <div className="my-4 px-3">
            <MinimalTweet tweet={tweetModal.replying.tweet} />
          </div>
        )}
        <TweetBoxModal replying={tweetModal.replying} />
      </div>
    </div>
  )
}

export default TweetModal

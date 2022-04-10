import TweetBox from "./TweetBox/TweetBox"
import { useTweetModal } from "./TweetModalContext"
import { useClickOutPicker } from "./TweetBox/PrivacyPicker"
import { XIcon } from "@heroicons/react/outline"

const TweetModal = () => {
  const { setToggleModal } = useTweetModal()
  const handleCloseTweetModal = () => setToggleModal(false)
  const refPicker = useClickOutPicker(() => {
    setToggleModal(false)
  })

  return (
    <div className="fixed z-50 flex h-screen w-screen items-start justify-center bg-black/70 pt-48">
      <div
        ref={refPicker}
        className="z-40 flex w-[300px] flex-col rounded-xl border-[1px] border-white bg-black p-4 text-white shadow-lg shadow-neutral-800 lg:w-[500px] xl:w-[700px]"
      >
        <button
          onClick={handleCloseTweetModal}
          className="self-start rounded-full p-2  hover:bg-[#d9d9d9] hover:bg-opacity-10"
        >
          <XIcon color="white" height={20} width={20} />
        </button>
        <TweetBox />
      </div>
    </div>
  )
}

export default TweetModal

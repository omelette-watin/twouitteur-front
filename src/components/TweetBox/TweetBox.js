import Image from "next/image"
import { useAppContext } from "@/components/AppContext"
import { Form } from "usetheform"
import SubmitButton from "./SubmitButton"
import WhatsHappeningBar from "./WhatsHappeningBar"
import CharacterCounter from "./CharacterCounter"
import api from "@/services/api"
import { useRef, useState } from "react"
import PrivacyPicker from "./PrivacyPicker"
import MediaBar from "./MediaBar"
import classNames from "classnames"
import { useTweetModal } from "../TweetModalContext"

const MAX_CHARS_ALLOWED = 140
const TweetBox = () => {
  const { setToggleModal } = useTweetModal()
  const { user } = useAppContext()
  const [submitting, setSubmitting] = useState(false)
  const [sentRes, setSentRes] = useState("")
  const editor = useRef()
  const onSubmit = (state) => {
    setSubmitting(true)
    const {
      editor: { plainText },
      postPrivacy,
    } = state

    api
      .post("/tweet/", { content: plainText.trim(), postPrivacy })
      .then((res) => {
        editor.current.reset()
        setSentRes(res.data.message)
        setTimeout(() => setSentRes(""), 3000)
        setToggleModal(false)
        setSubmitting(false)
      })
  }

  return (
    <div className="relative flex w-full items-start space-x-3 px-3 py-3 scrollbar-hide">
      <div className="mt-3">
        <Image
          src={user.image || "/default-avatar.svg"}
          alt="Your avatar"
          className="rounded-full"
          width={30}
          height={30}
        />
      </div>
      <Form className="z-4 w-full flex-grow" onSubmit={onSubmit}>
        <WhatsHappeningBar
          ref={editor}
          maxChars={MAX_CHARS_ALLOWED}
          placeholder="What's happening ?"
        />
        <PrivacyPicker />
        <div className="mt-2 flex justify-between border-t-[1px] border-gray-700 pt-3 pr-2">
          <MediaBar />
          <div className="flex items-center space-x-3">
            <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
            <SubmitButton loading={submitting} />
          </div>
        </div>
      </Form>

      <div
        className={classNames(
          "absolute -bottom-[50px] left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-[#1d9bf0] py-2 px-3 text-white transition-opacity",
          {
            "opacity-90": sentRes,
            "opacity-0 ": !sentRes,
          }
        )}
      >
        {sentRes}
      </div>
    </div>
  )
}

export default TweetBox

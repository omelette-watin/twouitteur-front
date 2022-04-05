import Image from "next/image"
import { useAuth } from "../../contexts/auth"
import { Form } from "usetheform"
import { SubmitButton } from "./SubmitButton"
import { WhatsHappeningBar } from "./WhatsHappeningBar"
import { CharacterCounter } from "./CharacterCounter"
import api from "../../services/api"
import { useRef, useState } from "react"
import { PrivacyPicker } from "./PrivacyPicker"

const MAX_CHARS_ALLOWED = 140
const TweetBox = () => {
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const editor = useRef()
  const onSubmit = (state) => {
    setSubmitting(true)
    const {
      editor: { plainText },
      postPrivacy,
    } = state
    console.log({
      plainText: plainText.trim(),
      postPrivacy,
    })
    // api.post("/tweet/", { content: plainText }).then(() => {
    //   editor.current.reset()
    setSubmitting(false)
    // })
  }

  return (
    <div
      className={`border-b border-gray-700 px-3 py-3 flex items-start space-x-3 scrollbar-hide`}
    >
      <div className={"mt-3"}>
        <Image
          src={user.image || "/default-avatar.svg"}
          alt="Your avatar"
          className="rounded-full"
          width={30}
          height={30}
        />
      </div>
      <Form className={"w-full z-4"} onSubmit={onSubmit}>
        <WhatsHappeningBar
          ref={editor}
          maxChars={MAX_CHARS_ALLOWED}
          placeholder={"What's happening ?"}
        />
        <PrivacyPicker />
        <div
          className={
            "flex justify-between border-t-[1px] border-gray-700 mt-2 pt-3 px-2"
          }
        >
          <div />
          <div className={"flex items-center space-x-3"}>
            <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
            <SubmitButton loading={submitting} />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default TweetBox

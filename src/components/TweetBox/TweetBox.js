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
import { useTweetModal } from "../TweetModalContext"
import classNames from "classnames"
import { useTweetPosted } from "../TweetPostedContext"
import Link from "next/link"

const MAX_CHARS_ALLOWED = 140
const TweetBox = () => {
  const { setToggleModal } = useTweetModal()
  const { user } = useAppContext()
  const [submitting, setSubmitting] = useState(false)
  const { setTweetsPosted } = useTweetPosted()
  const [newTweetId, setNewTweetId] = useState("")
  const editor = useRef()
  const onSubmit = (state) => {
    setSubmitting(true)
    const {
      editor: { plainText },
      postPrivacy,
    } = state

    api
      .post("/tweet/", { content: plainText.trim(), postPrivacy })
      .then(({ data }) => {
        editor.current.reset()
        const newTweet = {
          ...data.tweet,
          _count: {
            responses: 0,
            likes: 0,
            retweets: 0,
          },
          author: {
            id: user.id,
            username: user.username,
            profilename: user.profilename,
            image: user.image || null,
          },
        }
        setTweetsPosted((tweets) => [newTweet, ...tweets])
        setToggleModal(false)
        setNewTweetId(newTweet.id)
        setTimeout(() => setNewTweetId(""), 3000)
        setSubmitting(false)
      })
  }

  return (
    <>
      <div className="flex w-full items-start space-x-3 px-3 py-3 scrollbar-hide">
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
          <div className="mt-2 flex justify-between border-t border-gray-700 pt-3 pr-2">
            <MediaBar />
            <div className="flex items-center space-x-3">
              <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
              <SubmitButton loading={submitting} />
            </div>
          </div>
        </Form>
      </div>

      <p
        className={classNames(
          "fixed bottom-8 left-1/2 -translate-x-1/2 transform space-x-3 rounded-lg bg-[#1d9bf0] py-3 px-4 text-white",
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
    </>
  )
}

export default TweetBox

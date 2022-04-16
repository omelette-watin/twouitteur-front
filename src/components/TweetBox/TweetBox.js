import Image from "next/image"
import { useAppContext } from "@/components/AppContext"
import { Form } from "usetheform"
import SubmitButton from "./SubmitButton"
import WhatsHappeningBar from "./WhatsHappeningBar"
import CharacterCounter from "./CharacterCounter"
import api from "@/services/api"
import { useRef, useState, useEffect } from "react"
import PrivacyPicker from "./PrivacyPicker"
import MediaBar from "./MediaBar"
import { useTweetModal } from "../TweetModalContext"
import { useTweetPosted } from "../TweetPostedContext"
import Link from "next/link"

const MAX_CHARS_ALLOWED = 140
const TweetBox = ({ replying }) => {
  const { tweetModal, setTweetModal } = useTweetModal()
  const { user } = useAppContext()
  const [submitting, setSubmitting] = useState(false)
  const { setTweetsPosted, setNewTweetId } = useTweetPosted()
  const editor = useRef()
  const onSubmit = async (state) => {
    setSubmitting(true)
    const {
      editor: { plainText },
      postPrivacy,
    } = state

    if (!replying) {
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
          setTweetModal({ ...tweetModal, visible: false })
          setNewTweetId(newTweet.id)
          setTimeout(() => setNewTweetId(""), 3000)
          setSubmitting(false)
        })
    }

    if (replying) {
      api
        .post(`/tweet/${replying.tweet.id}/reply`, {
          content: plainText.trim(),
          postPrivacy,
        })
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
            originalTweet: {
              tweetId: replying.tweet.id,
              author: {
                username: replying.username,
              },
            },
          }
          setTweetsPosted((tweets) => [newTweet, ...tweets])
          setTweetModal({ replying: false, visible: false })
          setNewTweetId(newTweet.id)
          setTimeout(() => setNewTweetId(""), 3000)
          setSubmitting(false)
        })
    }
  }

  return (
    <div className="flex flex-col px-4">
      {replying && (
        <div className="flex w-full items-start space-x-3">
          <div className="w-[33px]" />
          <p className="text-[#71767b]">
            Replying to{" "}
            <Link href={`/user/${replying.username}`}>
              <a className="text-twitter underline-offset-1 hover:underline">
                @{replying.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex items-start space-x-3 py-3 scrollbar-hide">
        <div className="mt-3 flex-shrink-0">
          <Image
            src={user.image}
            alt="Your avatar"
            className="rounded-full bg-gray-300"
            width={36}
            height={36}
          />
        </div>
        <Form className="z-4 w-full" onSubmit={onSubmit}>
          <WhatsHappeningBar
            ref={editor}
            maxChars={MAX_CHARS_ALLOWED}
            placeholder={replying ? "Tweet your reply" : "What's happening ?"}
          />
          <PrivacyPicker />
          <div className="mt-2 flex justify-between border-t border-gray-700 pt-3 pr-2">
            <MediaBar />
            <div className="flex items-center space-x-3">
              <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
              <SubmitButton submitting={submitting} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
export const TweetBoxModal = ({ replying }) => {
  const { tweetModal, setTweetModal } = useTweetModal()
  const { user } = useAppContext()
  const [submitting, setSubmitting] = useState(false)
  const { setTweetsPosted, setNewTweetId } = useTweetPosted()
  const editor = useRef()
  const onSubmit = async (state) => {
    setSubmitting(true)
    const {
      editor: { plainText },
      postPrivacy,
    } = state

    if (!replying) {
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
          setTweetModal({ ...tweetModal, visible: false })
          setNewTweetId(newTweet.id)
          setTimeout(() => setNewTweetId(""), 3000)
          setSubmitting(false)
        })
    }

    if (replying) {
      api
        .post(`/tweet/${replying.tweet.id}/reply`, {
          content: plainText.trim(),
          postPrivacy,
        })
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
            originalTweet: {
              tweetId: replying.tweet.id,
              author: {
                username: replying.username,
              },
            },
          }
          setTweetsPosted((tweets) => [newTweet, ...tweets])
          setTweetModal({ replying: false, visible: false })
          setNewTweetId(newTweet.id)
          setTimeout(() => setNewTweetId(""), 3000)
          setSubmitting(false)
        })
    }
  }

  useEffect(() => {
    editor.current.focus()
  }, [tweetModal])

  return (
    <div className="flex flex-col px-4">
      {replying && (
        <div className="flex w-full items-start space-x-3 pl-1">
          <div className="w-[33px]" />
          <p className="text-sm text-[#71767b]">
            Replying to{" "}
            <Link href={`/user/${replying.username}`}>
              <a className="text-twitter underline-offset-1 hover:underline">
                @{replying.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex items-start space-x-3 py-3 scrollbar-hide">
        <div className="mt-3 flex-shrink-0">
          <Image
            src={user.image}
            alt="Your avatar"
            className="rounded-full bg-gray-300"
            width={36}
            height={36}
          />
        </div>
        <Form className="z-4 w-full" onSubmit={onSubmit}>
          <WhatsHappeningBar
            ref={editor}
            maxChars={MAX_CHARS_ALLOWED}
            placeholder={replying ? "Tweet your reply" : "What's happening ?"}
          />
          <PrivacyPicker />
          <div className="mt-2 flex justify-between border-t border-gray-700 pt-3 pr-2">
            <MediaBar />
            <div className="flex items-center space-x-3">
              <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
              <SubmitButton submitting={submitting} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TweetBox

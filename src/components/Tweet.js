import Image from "next/image"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import { AnnotationIcon, HeartIcon, ReplyIcon } from "@heroicons/react/outline"
import {
  HeartIcon as HeartIconSolid,
  ReplyIcon as ReplyIconSolid,
} from "@heroicons/react/solid"
import Link from "next/link"
import classNames from "classnames"
import { useState } from "react"
import { useAppContext } from "./AppContext"
import api from "@/services/api"
import { useTweetModal } from "./TweetModalContext"

TimeAgo.addDefaultLocale(en)
const TimeStamp = ({ date }) => {
  return (
    <time>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
    </time>
  )
}
const highlightText = (str) => {
  const parts = str.split(
    /\B([#|@][0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)(?![0-9A-Za-zÀ-ÖØ-öø-ÿ_-])/g
  )
  const hashtags = str.match(
    /\B(#[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)(?![0-9A-Za-zÀ-ÖØ-öø-ÿ_-])/g
  )
  const mentions = str.match(
    /\B(@[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)(?![0-9A-Za-zÀ-ÖØ-öø-ÿ_-])/g
  )
  const isMention = (str) => mentions?.includes(str)
  const isHashtag = (str) => hashtags?.includes(str)
  const isHashtagOrMention = (str) => isMention(str) || isHashtag(str)

  return (
    <span>
      {parts.map((part, i) => {
        return (
          <span
            key={i}
            className={classNames({
              "text-twitter": isHashtagOrMention(part),
            })}
          >
            {isHashtagOrMention(part) ? (
              <Link
                href={`${
                  isHashtag(part) ? "/hashtag" : "/user"
                }/${part.substring(1)}`}
              >
                <a className="underline-offset-1 hover:underline">{part}</a>
              </Link>
            ) : (
              part
            )}
          </span>
        )
      })}
    </span>
  )
}
const Tweet = ({ tweet }) => {
  const { user, setUser } = useAppContext()
  const { setTweetModal } = useTweetModal()
  const { author, _count, content, originalTweet } = tweet
  const [likes, setLikes] = useState(_count.likes)
  const [retweets, setRetweets] = useState(_count.retweets)
  const isLiked = user.likes.includes(tweet.id)
  const isRetweeted = user.retweets.includes(tweet.id)
  const handleLike = () => {
    api.post(`/tweet/${tweet.id}/like`).then(() => {
      if (isLiked) {
        setLikes(likes - 1)
        setUser({
          ...user,
          likes: user.likes.filter((like) => like !== tweet.id),
        })
      } else {
        setLikes(likes + 1)
        setUser({
          ...user,
          likes: user.likes.concat(tweet.id),
        })
      }
    })
  }
  const handleRetweet = () => {
    api.post(`/tweet/${tweet.id}/retweet`).then(() => {
      if (isRetweeted) {
        setRetweets(retweets - 1)
        setUser({
          ...user,
          retweets: user.retweets.filter((retweet) => retweet !== tweet.id),
        })
      } else {
        setRetweets(retweets + 1)
        setUser({
          ...user,
          retweets: user.retweets.concat(tweet.id),
        })
      }
    })
  }
  const handleReply = () =>
    setTweetModal({
      visible: true,
      replying: {
        username: author.username,
        tweet,
      },
    })

  return (
    <div className="flex flex-col space-y-2 border-b border-gray-700 px-4 py-2 text-sm sm:text-base xl:text-lg">
      {originalTweet && (
        <div className="mt-2 text-xs text-[#71767b]">
          <p>
            Replying to{" "}
            <Link href={`/user/${originalTweet.author.username}`}>
              <a className="text-twitter underline-offset-2 hover:underline">
                @{originalTweet.author.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Image
            width={36}
            height={36}
            alt={`${author.username} avatar`}
            src={author.image || "/default-avatar.svg"}
            className="rounded-full"
          />
        </div>
        <div className="grow-0 flex-col">
          <div className="space-x-1">
            <span className="font-extrabold">
              <Link href={`/${author.username}`}>
                <a className="underline-offset-2 hover:underline">
                  {author.profilename || author.username}
                </a>
              </Link>
            </span>
            <span className="text-[#71767b]">
              <Link href={`/${author.username}`}>
                <a>@{author.username}</a>
              </Link>{" "}
              · <TimeStamp date={tweet.createdAt} />
            </span>
          </div>
          <div className="whitespace-pre-wrap">{highlightText(content)}</div>
          <div className="mt-2 flex items-center space-x-4 text-xs text-[#71767b] sm:space-x-24 lg:text-sm">
            <div
              className="hover:text-twitter group flex cursor-pointer items-center space-x-1 transition ease-in-out"
              onClick={handleReply}
            >
              <AnnotationIcon className="group-hover:bg-twitter/10 h-8 rounded-full p-2 transition ease-in-out lg:h-9" />
              <span>{_count.responses}</span>
            </div>
            <div
              className={classNames(
                "group flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-green-500",
                {
                  "text-green-500": isRetweeted,
                }
              )}
              onClick={handleRetweet}
            >
              {isRetweeted ? (
                <ReplyIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-9" />
              ) : (
                <ReplyIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-9" />
              )}
              <span>{retweets}</span>
            </div>
            <div
              className={classNames(
                "group flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-red-500",
                {
                  "text-red-500": isLiked,
                }
              )}
              onClick={handleLike}
            >
              {isLiked ? (
                <HeartIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-9" />
              ) : (
                <HeartIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-9" />
              )}
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MinimalTweet = ({ tweet }) => {
  const { author, content } = tweet

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <Image
          width={36}
          className="rounded-full"
          height={36}
          alt={`${author.username} avatar`}
          src={author.image || "/default-avatar.svg"}
        />
      </div>

      <div className="w-full flex-col">
        <div className="flex items-center space-x-1">
          <p className="font-extrabold">
            <Link href={`/${author.username}`}>
              <a className="underline-offset-2 hover:underline">
                {author.profilename || author.username}
              </a>
            </Link>
          </p>
          <p className="text-[#71767b]">
            <Link href={`/${author.username}`}>
              <a>@{author.username}</a>
            </Link>{" "}
            · <TimeStamp date={tweet.createdAt} />
          </p>
        </div>
        <div className="whitespace-pre-wrap">{highlightText(content)}</div>
      </div>
    </div>
  )
}

export default Tweet
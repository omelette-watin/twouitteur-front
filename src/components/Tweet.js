import Image from "next/image"
import {
  AnnotationIcon,
  HeartIcon,
  ReplyIcon,
  ShareIcon,
} from "@heroicons/react/outline"
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
import Date from "./Date"

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
export const ToolTip = ({ children }) => {
  return (
    <div className="absolute -bottom-7 -right-7 hidden w-max rounded bg-gray-700/80 py-1 px-2 text-xs text-white shadow-sm group-hover:block">
      {children}
    </div>
  )
}
const Tweet = ({ tweet }) => {
  const { user, setUser } = useAppContext()
  const { setTweetModal } = useTweetModal()
  const { author, _count, content, originalTweet } = tweet
  const [likesCount, setLikesCount] = useState(_count.likes)
  const [retweetsCount, setRetweetsCount] = useState(_count.retweets)
  const [copied, setCopied] = useState(false)
  const [liking, setLiking] = useState(false)
  const [retweeting, setRetweeting] = useState(false)
  const isLiked = user.likes.includes(tweet.id)
  const isRetweeted = user.retweets.includes(tweet.id)
  const handleLike = () => {
    setLiking(true)
    api.post(`/tweet/${tweet.id}/like`).then(() => {
      if (isLiked) {
        setLikesCount(likesCount - 1)
        setUser({
          ...user,
          likes: user.likes.filter((like) => like !== tweet.id),
        })
      } else {
        setLikesCount(likesCount + 1)
        setUser({
          ...user,
          likes: user.likes.concat(tweet.id),
        })
      }

      setLiking(false)
    })
  }
  const handleRetweet = () => {
    setRetweeting(true)
    api.post(`/tweet/${tweet.id}/retweet`).then(() => {
      if (isRetweeted) {
        setRetweetsCount(retweetsCount - 1)
        setUser({
          ...user,
          retweets: user.retweets.filter((retweet) => retweet !== tweet.id),
        })
      } else {
        setRetweetsCount(retweetsCount + 1)
        setUser({
          ...user,
          retweets: user.retweets.concat(tweet.id),
        })
      }

      setRetweeting(false)
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
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://twouitteur.vercel.app/status/${tweet.id}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="flex flex-col space-y-2 border-b border-gray-700 px-4 pb-2 pt-3 text-sm sm:text-base xl:text-lg">
      {originalTweet && (
        <div className="mt-2 text-xs text-[#71767b]">
          <p>
            Replying to{" "}
            <Link href={`/user/${originalTweet.author.username}`}>
              <a className="text-twitter underline-offset-1 hover:underline">
                @{originalTweet.author.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex items-start space-x-3">
        <div className="mt-1 flex-shrink-0">
          <Image
            width={36}
            height={36}
            alt={`${author.username} avatar`}
            src={author.image}
            className="rounded-full bg-gray-300"
          />
        </div>
        <div className="w-[90%] grow-0 flex-col">
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
              · <Date date={tweet.createdAt} />
            </span>
          </div>
          <div className="whitespace-pre-wrap break-words">
            {highlightText(content)}
          </div>
          <div className="mt-2 flex w-full items-center justify-between text-xs text-[#71767b] sm:pr-24 lg:text-sm">
            <div
              className="hover:text-twitter group relative flex cursor-pointer items-center space-x-1 transition ease-in-out"
              onClick={handleReply}
            >
              <AnnotationIcon className="group-hover:bg-twitter/10 h-8 rounded-full p-2 transition ease-in-out lg:h-9" />
              <span>{_count.responses}</span>
              <ToolTip>Reply</ToolTip>
            </div>
            <button
              className={classNames(
                "group relative flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-green-500",
                {
                  "text-green-500": isRetweeted,
                }
              )}
              onClick={handleRetweet}
              disabled={retweeting}
            >
              {isRetweeted ? (
                <ReplyIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-9" />
              ) : (
                <ReplyIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-9" />
              )}
              <span>{retweetsCount}</span>
              <ToolTip>Retweet</ToolTip>
            </button>
            <button
              className={classNames(
                "group relative flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-red-500",
                {
                  "text-red-500": isLiked,
                }
              )}
              onClick={handleLike}
              disabled={liking}
            >
              {isLiked ? (
                <HeartIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-9" />
              ) : (
                <HeartIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-9" />
              )}
              <span>{likesCount}</span>
              <ToolTip>Like</ToolTip>
            </button>
            <button
              className="hover:text-twitter group relative flex cursor-pointer items-center space-x-1 transition ease-in-out"
              onClick={handleCopyLink}
            >
              {copied ? (
                <span className="text-twitter">Copied !</span>
              ) : (
                <ShareIcon className="group-hover:bg-twitter/10 h-8 rounded-full p-2 transition ease-in-out lg:h-9" />
              )}
              <ToolTip>Copy link</ToolTip>
            </button>
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
      <div className="mt-1 flex-shrink-0">
        <Image
          src={author.image}
          className="rounded-full bg-gray-300"
          width={36}
          height={36}
          alt={`${author.username} avatar`}
        />
      </div>

      <div className="w-full flex-col space-y-2">
        <div className="flex flex-wrap items-center space-x-1">
          <p className="font-extrabold">
            <Link href={`/${author.username}`}>
              <a className="underline-offset-1 hover:underline">
                {author.profilename || author.username}
              </a>
            </Link>
          </p>
          <p className="text-[#71767b]">
            <Link href={`/${author.username}`}>
              <a>@{author.username}</a>
            </Link>{" "}
            · <Date date={tweet.createdAt} />
          </p>
        </div>
        <div className="whitespace-pre-wrap">{highlightText(content)}</div>
      </div>
    </div>
  )
}

export default Tweet

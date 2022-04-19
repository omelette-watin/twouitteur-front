import Image from "next/image"
import TweetBox from "@/components/TweetBox/TweetBox"
import {
  AnnotationIcon,
  CheckIcon,
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
import Date, { FullDate } from "./Date"
import { useRouter } from "next/router"

const stopPropagation = (e) => {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
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
                <a
                  onClick={(e) => {
                    stopPropagation(e)
                  }}
                  className="underline-offset-1 hover:underline"
                >
                  {part}
                </a>
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
  const router = useRouter()
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
  const handleLike = (e) => {
    e.stopPropagation()
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
  const handleRetweet = (e) => {
    e.stopPropagation()
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
  const handleReply = (e) => {
    e.stopPropagation()
    setTweetModal({
      visible: true,
      replying: {
        username: author.username,
        tweet,
      },
    })
  }
  const handleCopyLink = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(
      `https://twouitteur.vercel.app/status/${tweet.id}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }
  const handleClickOnTweet = () => {
    if (!window.getSelection().toString()) {
      router.push(`/status/${tweet.id}`)
    }
  }

  return (
    <div
      className="flex w-full cursor-pointer flex-col space-y-2 border-b border-gray-700 px-4 pb-2 pt-3 text-sm transition ease-in-out hover:bg-neutral-900/50 sm:text-base xl:text-lg"
      onClick={handleClickOnTweet}
    >
      {originalTweet && (
        <div className="z-10 mt-2 text-xs text-[#71767b]">
          <p>
            Replying to{" "}
            <Link href={`/${originalTweet.author.username}`}>
              <a
                onClick={(e) => {
                  stopPropagation(e)
                }}
                className="text-twitter underline-offset-1 hover:underline"
              >
                @{originalTweet.author.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex w-full items-start space-x-3">
        <div className=" mt-1 flex-shrink-0">
          <Link href={`/${author.username}`}>
            <a>
              <Image
                width={36}
                height={36}
                alt={`${author.username} avatar`}
                src={author.image}
                className="rounded-full bg-gray-300"
              />
            </a>
          </Link>
        </div>
        <div className="w-[85%] grow-0 flex-col sm:w-[90%]">
          <div className="space-x-1">
            <span className="font-extrabold">
              <Link href={`/${author.username}`}>
                <a
                  onClick={(e) => {
                    stopPropagation(e)
                  }}
                  className="underline-offset-2 hover:underline"
                >
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
          <div className="max-w-full whitespace-pre-wrap break-words">
            {highlightText(content)}
          </div>
          <div className="mt-2 flex w-full items-center justify-between text-xs text-[#71767b] sm:justify-start sm:space-x-20 lg:text-sm xl:space-x-24">
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
    <div className="flex w-full items-start space-x-3">
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
              <a
                onClick={(e) => {
                  stopPropagation(e)
                }}
                className="underline-offset-1 hover:underline"
              >
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
        <div className="w-[90%] max-w-full whitespace-pre-wrap break-words">
          {highlightText(content)}
        </div>
      </div>
    </div>
  )
}
export const MainTweet = ({ tweet }) => {
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
  const [reply, setReply] = useState(false)
  const handleLike = (e) => {
    e.stopPropagation()
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
  const handleRetweet = (e) => {
    e.stopPropagation()
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
  const handleReply = (e) => {
    e.stopPropagation()
    setTweetModal({
      visible: true,
      replying: {
        username: author.username,
        tweet,
      },
    })
  }
  const handleCopyLink = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(
      `https://twouitteur.vercel.app/status/${tweet.id}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }
  const handleOpenTweetBox = () => setReply(true)

  return (
    <div className="flex w-full flex-col space-y-2 border-b border-gray-700 px-4 pb-3 pt-3 text-sm transition ease-in-out sm:text-base xl:text-lg">
      <div className="mb-3 flex w-full flex-col items-start space-y-4 pr-2">
        <div className="mt-1 flex flex-shrink-0 space-x-4">
          <Link href={`/${author.username}`}>
            <a>
              <Image
                width={70}
                height={70}
                alt={`${author.username} avatar`}
                src={author.image}
                className="rounded-full bg-gray-300"
              />
            </a>
          </Link>
          <div className="flex flex-col space-y-0">
            <span className="font-extrabold">
              <Link href={`/${author.username}`}>
                <a
                  onClick={(e) => {
                    stopPropagation(e)
                  }}
                  className="underline-offset-2 hover:underline"
                >
                  {author.profilename || author.username}
                </a>
              </Link>
            </span>
            <span className="text-[#71767b]">
              <Link href={`/${author.username}`}>
                <a>@{author.username}</a>
              </Link>{" "}
            </span>
          </div>
        </div>
        {originalTweet && (
          <div className="z-10 mt-2 text-lg text-[#71767b]">
            <p>
              Replying to{" "}
              <Link href={`/${originalTweet.author.username}`}>
                <a
                  onClick={(e) => {
                    stopPropagation(e)
                  }}
                  className="text-twitter underline-offset-1 hover:underline"
                >
                  @{originalTweet.author.username}
                </a>
              </Link>
            </p>
          </div>
        )}
        <div className="max-w-full whitespace-pre-wrap break-words text-xl sm:text-2xl">
          {highlightText(content)}
        </div>
        <div className="w-full border-b border-gray-700 pb-4 text-[#71767b]">
          <FullDate date={tweet.createdAt} full />
        </div>
        <div className="flex w-full flex-wrap space-x-3 border-b border-gray-700 pb-4 text-[#71767b]">
          <div>
            <span className="text-white">{likesCount}</span> Like
            {likesCount > 0 && "s"}
          </div>
          <div>
            <span className="text-white">{retweetsCount}</span> Retweet
            {retweetsCount > 0 && "s"}
          </div>
          <div>
            <span className="text-white">{_count.responses}</span> Repl
            {_count.responses > 0 ? "ies" : "y"}
          </div>
        </div>
        <div className="mt-2 flex w-full items-center justify-around border-b border-gray-700 pb-4 text-[#71767b]">
          <div
            className="hover:text-twitter group relative flex cursor-pointer items-center space-x-1 transition ease-in-out"
            onClick={handleReply}
          >
            <AnnotationIcon className="group-hover:bg-twitter/10 h-8 rounded-full p-2 transition ease-in-out lg:h-10" />
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
              <ReplyIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-10" />
            ) : (
              <ReplyIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10 lg:h-10" />
            )}
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
              <HeartIconSolid className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-10" />
            ) : (
              <HeartIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10 lg:h-10" />
            )}
            <ToolTip>Like</ToolTip>
          </button>
          <button
            className="hover:text-twitter group relative flex cursor-pointer items-center space-x-1 transition ease-in-out"
            onClick={handleCopyLink}
          >
            {copied ? (
              <CheckIcon className="bg-twitter/10 text-twitter h-8 rounded-full p-2 transition ease-in-out lg:h-10" />
            ) : (
              <ShareIcon className="group-hover:bg-twitter/10 h-8 rounded-full p-2 transition ease-in-out lg:h-10" />
            )}
            <ToolTip>Copy link</ToolTip>
          </button>
        </div>
      </div>
      {!reply ? (
        <div className="flex w-full flex-wrap items-center justify-between p-2">
          <div className="mb-2 flex items-center space-x-6">
            <Image
              src={user.image}
              alt={"your avatar"}
              width={50}
              height={50}
              className="rounded-full bg-gray-300"
            />
            <p
              className="cursor-text text-[#71767b]"
              onClick={handleOpenTweetBox}
            >
              Tweet your reply
            </p>
          </div>
          <button
            className="disabled:bg-twitter/50 flex items-center rounded-full border-0 py-1 px-4 text-lg font-semibold disabled:cursor-default"
            disabled={true}
          >
            <span>Reply</span>
          </button>
        </div>
      ) : (
        <TweetBox
          replying={{
            username: tweet.author.username,
            tweet,
          }}
        />
      )}
    </div>
  )
}

export default Tweet

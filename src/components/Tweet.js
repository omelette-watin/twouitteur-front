import Image from "next/image"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import { AnnotationIcon, HeartIcon, ReplyIcon } from "@heroicons/react/outline"
import Link from "next/link"
import classNames from "classnames"

TimeAgo.addDefaultLocale(en)
const TimeStamp = ({ date }) => {
  return (
    <time>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
    </time>
  )
}
const highlightText = (str) => {
  const parts = str.split(/(?<=[\s>]|^)([#@]\d*[A-Za-zÀ-ÖØ-öø-ÿ_-]+\d*)/gu)
  const hashtags = str.match(/(?<=[\s>]|^)(#\d*[A-Za-zÀ-ÖØ-öø-ÿ_-]+\d*)/gu)
  const mentions = str.match(/(?<=[\s>]|^)(@\d*[A-Za-zÀ-ÖØ-öø-ÿ_-]+\d*)/gu)
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
              "text-[#1d9bf0]": isHashtagOrMention(part),
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
  const { author, _count, content } = tweet

  return (
    <div className="flex items-start space-x-2 border-b border-gray-700 px-4 py-2">
      <Image
        width={36}
        height={36}
        alt={`${author.username} avatar`}
        src={author.image || "/default-avatar.svg"}
      />
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
        <div className="mt-2 flex w-full items-center space-x-24 text-xs text-[#71767b]">
          <div className="group flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-[#1d9bf0]">
            <AnnotationIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-[#1d9bf0]/10" />
            <span>{_count.retweets}</span>
          </div>
          <div className="group flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-green-500">
            <ReplyIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-green-500/10" />
            <span>{_count.responses}</span>
          </div>
          <div className="group flex cursor-pointer items-center space-x-1 transition ease-in-out hover:text-red-500">
            <HeartIcon className="h-8 rounded-full p-2 transition ease-in-out group-hover:bg-red-500/10" />
            <span>{_count.likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet

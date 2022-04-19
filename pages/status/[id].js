import MainWrapper from "@/components/MainWrapper"
import Tweet, { MainTweet } from "@/components/Tweet"
import api from "@/services/api"
import { useTweetPosted } from "@/components/TweetPostedContext"
import Scroller from "@/components/Scroller"
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"

const Status = ({ tweet }) => {
  const {
    _count: { responses: replies },
  } = tweet
  const { tweetsPosted } = useTweetPosted()
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [originalTweets, setOriginalTweets] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [hasMoreOriginals, setHasMoreOriginals] = useState()
  const baseUrl = `/tweet/${tweet.id}/replies`
  const loadMoreReplies = async () => {
    const lastId = tweets[tweets.length - 1]?.incId
    const url = `${baseUrl}/?order=latest&cursor=${lastId}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(tweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }
  const loadOriginalTweet = async () => {
    api.get(`/tweet/${hasMoreOriginals}`).then(({ data }) => {
      setOriginalTweets(originalTweets.concat(data))
      setHasMoreOriginals(data.originalTweetId)
    })
  }

  useEffect(() => {
    if (replies) {
      const url = `${baseUrl}?order=latest`
      api.get(url).then(({ data }) => {
        if (data.length) {
          setTweets(data)
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      })
    }

    setHasMoreOriginals(tweet.originalTweetId)
    setLoading(false)

    return () => {
      setTweets([])
      setHasMoreOriginals()
      setOriginalTweets([])
      setLoading(true)
    }
  }, [tweet, replies, baseUrl])

  return (
    <MainWrapper>
      {tweet.originalTweetId && hasMoreOriginals && (
        <div className="flex w-full justify-center pt-2">
          <button
            onClick={loadOriginalTweet}
            className="rounded-full bg-gray-600 px-4 py-1 underline-offset-2 transition ease-in-out hover:bg-gray-800"
          >
            Show previous tweet
          </button>
        </div>
      )}
      {originalTweets.length > 0 &&
        originalTweets
          .map((tweet) => {
            return <Tweet tweet={tweet} key={tweet.id} />
          })
          .reverse()}
      <MainTweet tweet={tweet} />
      {tweetsPosted.length > 0 &&
        tweetsPosted
          .filter(
            (tweetPosted) => tweetPosted.originalTweet?.tweetId === tweet.id
          )
          .map((tweet) => {
            return <Tweet tweet={tweet} key={tweet.id} />
          })}
      {loading && (
        <div className="my-8 flex w-full justify-center">
          <Loading color="#00AAEC" />
        </div>
      )}
      {tweets.length === 0 && !loading && (
        <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
          This tweet has no reply yet
        </div>
      )}
      {tweets.length > 0 && (
        <Scroller
          loadMore={loadMoreReplies}
          hasMore={hasMore}
          tweets={tweets}
        />
      )}
    </MainWrapper>
  )
}

export default Status

export async function getServerSideProps({ params }) {
  const tweetId = params.id
  const { data: tweet } = await api.get(`/tweet/${tweetId}`)

  return {
    props: {
      title: `${tweet.author.profilename} on Twouitteur: ${tweet.content}`,
      tweet,
    },
  }
}

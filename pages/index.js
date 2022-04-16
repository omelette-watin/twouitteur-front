import MainWrapper from "@/components/MainWrapper"
import TweetBox from "@/components/TweetBox/TweetBox"
import { useTweetPosted } from "@/components/TweetPostedContext"
import Tweet from "@/components/Tweet"
import api from "@/services/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Scroller from "@/components/Scroller"
import Loading from "@/components/Loading"

const Home = () => {
  const { tweetsPosted, setTweetsPosted } = useTweetPosted()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    const lastId = tweets[tweets.length - 1]?.incId
    const url = `/tweet/feed?cursor=${lastId}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(tweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }

  useEffect(() => {
    api.get("/tweet/feed").then(({ data }) => {
      if (data.length) {
        setTweets(data)
      } else {
        setHasMore(false)
      }

      setLoading(false)
    })
  }, [router])

  useEffect(() => {
    setTweetsPosted([])
  }, [router, setTweetsPosted])

  return (
    <MainWrapper title={"Home"}>
      <div className="border-b border-gray-700">
        <TweetBox />
      </div>
      {tweetsPosted.length > 0 &&
        tweetsPosted.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />
        })}
      {loading && (
        <div className="my-8 flex w-full justify-center">
          <Loading color="#00AAEC" />
        </div>
      )}
      {tweets.length === 0 && !loading && (
        <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
          No results ...
        </div>
      )}
      {tweets.length > 0 && (
        <Scroller
          tweets={tweets}
          loadMore={loadMore}
          hasMore={hasMore}
          search={"Your feed"}
        />
      )}
    </MainWrapper>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  }
}

export default Home

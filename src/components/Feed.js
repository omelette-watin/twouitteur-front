import api from "@/services/api"
import Tweet from "./Tweet"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import InfiniteScroll from "react-infinite-scroll-component"

const Feed = () => {
  const [tweets, setTweets] = useState([])
  const [more, setMore] = useState(true)

  useEffect(() => {
    api.get("/tweet/feed").then(({ data }) => {
      if (data.length) {
        setTweets(data)
      } else {
        setMore(false)
      }
    })
  }, [])

  const loadMore = () => {
    const lastId = tweets[tweets.length - 1].incId
    api.get(`/tweet/feed?cursor=${lastId}`).then(({ data }) => {
      if (data.length) {
        setTweets(tweets.concat(data))
      } else {
        setMore(false)
      }
    })
  }

  return (
    <div>
      <InfiniteScroll
        next={loadMore}
        dataLength={tweets.length}
        hasMore={more}
        loader={
          <div className="mt-8 flex w-full justify-center">
            <Loading color="#00AAEC" />
          </div>
        }
        endMessage={
          <div className="mb-20 flex w-full justify-center py-4 text-gray-400">
            Nothing else to show for now...
          </div>
        }
        className="scrollbar-hide"
      >
        {tweets.length > 0 &&
          tweets.map((tweet) => {
            return <Tweet tweet={tweet} key={tweet.id} />
          })}
      </InfiniteScroll>
    </div>
  )
}

export default Feed

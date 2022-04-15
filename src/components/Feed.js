import Tweet from "./Tweet"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import InfiniteScroll from "react-infinite-scroll-component"

const Loader = (
  <div className="my-8 flex w-full justify-center">
    <Loading color="#00AAEC" />
  </div>
)
const EndMessage = (
  <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
    Nothing else to show for now...
  </div>
)
const Feed = ({ initialFeed, loadMoreFeed, search }) => {
  const [tweets, setTweets] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [initialLoading, setInitalLoading] = useState(true)

  useEffect(() => {
    initialFeed(setTweets, setHasMore, setInitalLoading)

    return () => {
      setTweets([])
      setInitalLoading(true)
    }
  }, [search])

  const loadMore = () => {
    const lastId = tweets[tweets.length - 1]?.incId
    loadMoreFeed(setTweets, setHasMore, lastId)
  }

  return (
    <InfiniteScroll
      next={loadMore}
      dataLength={tweets.length}
      hasMore={hasMore}
      loader={Loader}
      endMessage={tweets.length !== 0 ? EndMessage : null}
      style={{ overflowY: "hidden", paddingBottom: "80px" }}
    >
      {initialLoading && Loader}
      {tweets.length > 0 &&
        tweets.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />
        })}
      {tweets.length === 0 && !hasMore && (
        <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
          No result for {search}
        </div>
      )}
    </InfiniteScroll>
  )
}

export default Feed

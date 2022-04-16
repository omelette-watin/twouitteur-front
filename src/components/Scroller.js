import InfiniteScroll from "react-infinite-scroll-component"
import Tweet from "./Tweet"
import Loading from "./Loading"

const Loader = (
  <div className="my-8 flex w-full justify-center">
    <Loading color="#00AAEC" />
  </div>
)
const Scroller = ({
  loadMore,
  tweets,
  hasMore,
  search,
  endMessage = "Nothing else to show for now...",
}) => {
  const EndMessage = (
    <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
      {endMessage}
    </div>
  )

  return (
    <InfiniteScroll
      next={loadMore}
      dataLength={tweets.length}
      loader={Loader}
      hasMore={hasMore}
      endMessage={EndMessage}
      style={{
        overflowY: "hidden",
        paddingBottom: "80px",
      }}
    >
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

export default Scroller

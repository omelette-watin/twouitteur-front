import MainWrapper from "@/components/MainWrapper"
import TweetBox from "@/components/TweetBox/TweetBox"
import { useTweetPosted } from "@/components/TweetPostedContext"
import Tweet from "@/components/Tweet"
import Feed from "@/components/Feed"
import api from "@/services/api"

const Home = () => {
  const { tweetsPosted } = useTweetPosted()
  const loadMoreFeed = async (setTweets, setHasMore, lastId) => {
    const url = `/tweet/feed${lastId ? `?cursor=${lastId}` : ""}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets((prevTweets) => prevTweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }
  const initialFeed = async (setTweets, setHasMore, setLoading) => {
    const url = "/tweet/feed"

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(data)
      } else {
        setHasMore(false)
      }

      setLoading(false)
    })
  }

  return (
    <MainWrapper title={"Home"}>
      <div className="border-b border-gray-700">
        <TweetBox />
      </div>
      {tweetsPosted.length > 0 &&
        tweetsPosted.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />
        })}
      <Feed
        loadMoreFeed={loadMoreFeed}
        initialFeed={initialFeed}
        search={"your feed"}
      />
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

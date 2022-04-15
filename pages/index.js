import MainWrapper from "@/components/MainWrapper"
import TweetBox from "@/components/TweetBox/TweetBox"
import { useTweetPosted } from "@/components/TweetPostedContext"
import Tweet from "@/components/Tweet"
import Feed from "@/components/Feed"
import api from "@/services/api"

const getHomeFeed = async (setTweets, setHasMore, lastId) => {
  const url = `/tweet/feed${lastId ? `?cursor=${lastId}` : ""}`

  api.get(url).then(({ data }) => {
    if (data.length) {
      setTweets((prevTweets) => prevTweets.concat(data))
    } else {
      setHasMore(false)
    }
  })
}
const Home = () => {
  const { tweetsPosted } = useTweetPosted()

  return (
    <MainWrapper title={"Home"}>
      <div className="border-b border-gray-700">
        <TweetBox />
      </div>
      {tweetsPosted.length > 0 &&
        tweetsPosted.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />
        })}
      <Feed feedFunction={getHomeFeed} />
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

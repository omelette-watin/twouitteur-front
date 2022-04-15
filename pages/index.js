import MainWrapper from "@/components/MainWrapper"
import TweetBox from "@/components/TweetBox/TweetBox"
import { useTweetPosted } from "@/components/TweetPostedContext"
import Tweet from "@/components/Tweet"
import Feed from "@/components/Feed"

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
      <Feed />
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

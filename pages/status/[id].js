import MainWrapper from "@/components/MainWrapper"
import Tweet, { MainTweet } from "@/components/Tweet"
import api from "@/services/api"
import { useTweetPosted } from "@/components/TweetPostedContext"

const Status = ({ tweet }) => {
  const { tweetsPosted } = useTweetPosted()

  return (
    <MainWrapper>
      <MainTweet tweet={tweet} />
      {tweetsPosted.length > 0 &&
        tweetsPosted
          .filter(
            (tweetPosted) => tweetPosted.originalTweet?.tweetId === tweet.id
          )
          .map((tweet) => {
            return <Tweet tweet={tweet} key={tweet.id} />
          })}
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

import MainWrapper from "@/components/MainWrapper"
import { MainTweet } from "@/components/Tweet"
import api from "@/services/api"

const Status = ({ tweet }) => {
  return (
    <MainWrapper>
      <MainTweet tweet={tweet} />
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

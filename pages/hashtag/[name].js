import Feed from "@/components/Feed"
import MainWrapper from "@/components/MainWrapper"
import api from "@/services/api"

const Hashtag = ({ hashtag }) => {
  const baseUrl = "/tweet/hashtag"
  const getHashtagFeed = async (setTweets, setHasMore, lastId) => {
    const url = `${baseUrl}/${hashtag}?order=popular&${
      lastId ? `cursor=${lastId}` : ""
    }`

    api.get(url).then(({ data }) => {
      if (data.length) {
        if (!lastId) {
          setTweets(data)
        } else {
          setTweets((prevTweets) => prevTweets.concat(data))
        }
      } else {
        setHasMore(false)
      }
    })
  }

  return (
    <MainWrapper title={`#${hashtag}`}>
      <Feed feedFunction={getHashtagFeed} search={`#${hashtag}`} />
    </MainWrapper>
  )
}

export async function getServerSideProps({ params }) {
  const hashtag = params.name

  return {
    props: {
      title: `#${hashtag}`,
      hashtag,
    },
  }
}

export default Hashtag

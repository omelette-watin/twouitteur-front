import Feed from "@/components/Feed"
import MainWrapper from "@/components/MainWrapper"
import api from "@/services/api"

const Hashtag = ({ hashtag }) => {
  const baseUrl = "/tweet/hashtag"
  const loadMoreHashtagFeed = async (setTweets, setHasMore, lastId) => {
    const url = `${baseUrl}/${hashtag}?order=popular&cursor=${lastId}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets((prevTweets) => prevTweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }
  const initialFeed = async (setTweets, setHasMore, setLoading) => {
    const url = `${baseUrl}/${hashtag}?order=popular`

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
    <MainWrapper title={`#${hashtag}`}>
      <Feed
        loadMoreFeed={loadMoreHashtagFeed}
        initialFeed={initialFeed}
        search={`#${hashtag}`}
      />
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

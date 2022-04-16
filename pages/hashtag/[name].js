import MainWrapper from "@/components/MainWrapper"
import Scroller from "@/components/Scroller"
import api from "@/services/api"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loading from "@/components/Loading"

const Hashtag = ({ hashtag }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const baseUrl = "/tweet/hashtag"
  const loadMore = async () => {
    const lastId = tweets[tweets.length - 1]?.incId
    const url = `${baseUrl}/${hashtag}?order=popular&cursor=${lastId}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(tweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }

  useEffect(() => {
    const url = `${baseUrl}/${hashtag}?order=popular`
    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(data)
      } else {
        setHasMore(false)
      }

      setLoading(false)
    })

    return () => {
      setTweets([])
      setLoading(true)
    }
  }, [router, hashtag])

  return (
    <MainWrapper title={`#${hashtag}`}>
      {loading && (
        <div className="my-8 flex w-full justify-center">
          <Loading color="#00AAEC" />
        </div>
      )}
      <Scroller
        loadMore={loadMore}
        hasMore={hasMore}
        tweets={tweets}
        endMessage={`#${hashtag}`}
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

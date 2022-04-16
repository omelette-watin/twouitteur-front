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
        setHasMore(true)
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
      {tweets.length === 0 && !loading && (
        <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
          No result for #{hashtag} ...
        </div>
      )}
      {tweets.length > 0 && (
        <Scroller loadMore={loadMore} hasMore={hasMore} tweets={tweets} />
      )}
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

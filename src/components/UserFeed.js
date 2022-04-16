import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "@/services/api"
import Loading from "./Loading"
import Scroller from "./Scroller"

const UserFeed = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const baseUrl = "/tweet/user"
  const loadMore = async () => {
    const lastId = tweets[tweets.length - 1]?.incId
    const url = `${baseUrl}/${user.id}?order=latest&cursor=${lastId}`

    api.get(url).then(({ data }) => {
      if (data.length) {
        setTweets(tweets.concat(data))
      } else {
        setHasMore(false)
      }
    })
  }

  useEffect(() => {
    api.get(`${baseUrl}/${user.id}`).then(({ data }) => {
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
  }, [router, user])

  return (
    <>
      {loading && (
        <div className="my-8 flex w-full justify-center">
          <Loading color="#00AAEC" />
        </div>
      )}
      {tweets.length === 0 && !loading && (
        <div className="mt-8 flex w-full justify-center text-xs text-gray-400 sm:text-base">
          This user hasn't tweeted yet ...
        </div>
      )}
      {tweets.length > 0 && (
        <Scroller loadMore={loadMore} hasMore={hasMore} tweets={tweets} />
      )}
    </>
  )
}

export default UserFeed

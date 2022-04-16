import { createContext, useContext, useState } from "react"

export const TweetPostedContext = createContext({})

export const useTweetPosted = () => useContext(TweetPostedContext)

export const TweetPostedProvider = (props) => {
  const [tweetsPosted, setTweetsPosted] = useState([])
  const [newTweetId, setNewTweetId] = useState("")

  return (
    <TweetPostedContext.Provider
      {...props}
      value={{ tweetsPosted, setTweetsPosted, newTweetId, setNewTweetId }}
    />
  )
}

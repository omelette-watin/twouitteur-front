import { createContext, useContext, useState } from "react"

export const TweetModalContext = createContext({})

export const useTweetModal = () => useContext(TweetModalContext)

export const TweetModalProvider = (props) => {
  const [tweetModal, setTweetModal] = useState({
    visible: false,
    replying: false,
  })

  return (
    <TweetModalContext.Provider
      {...props}
      value={{ tweetModal, setTweetModal }}
    />
  )
}

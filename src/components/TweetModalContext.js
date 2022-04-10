import { createContext, useContext, useState } from "react"

export const TweetModalContext = createContext({})

export const useTweetModal = () => useContext(TweetModalContext)

export const TweetModalProvider = (props) => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <TweetModalContext.Provider
      {...props}
      value={{ toggleModal, setToggleModal }}
    />
  )
}

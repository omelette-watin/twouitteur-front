import { createContext, useContext, useState } from "react"

export const EditProfileContext = createContext({})

export const useEditProfile = () => useContext(EditProfileContext)

export const EditProfileProvider = (props) => {
  const [editModal, setEditModal] = useState(false)

  return (
    <EditProfileContext.Provider
      {...props}
      value={{ editModal, setEditModal }}
    />
  )
}

import { useAppContext } from "./AppContext"
import { useState, useEffect } from "react"
import { useEditProfile } from "./EditProfileContext"
import api from "@/services/api"
import Image from "next/image"
import { CameraIcon, CheckIcon } from "@heroicons/react/outline"
import { XIcon } from "@heroicons/react/solid"
import classNames from "classnames"

const PROFILENAME_MAX_CHAR = 30
const BIO_MAX_CHAR = 160
const AvatarPicker = ({ onAvatarClick, current, close }) => {
  const [avatars, setAvatars] = useState([])

  useEffect(() => {
    const imgs = []
    for (let index = 1; index < 41; index++) {
      imgs.push(
        <Image
          src={`/avatars/${index}.svg`}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full bg-gray-300"
        />
      )
    }
    setAvatars(imgs)
  }, [])

  return (
    <div className="fixed inset-0 z-10 w-[100vw] overflow-y-scroll overscroll-contain rounded-md border-white bg-black p-4 pb-16 shadow-gray-500 sm:absolute sm:left-0 sm:min-h-fit sm:w-fit sm:overflow-y-auto sm:border sm:pb-4 sm:shadow-sm">
      <button
        onClick={close}
        className="self-start rounded-full p-2 hover:bg-[#d9d9d9] hover:bg-opacity-10"
      >
        <XIcon color="white" height={20} width={20} />
      </button>
      <p className="pt-3 pl-2">Please choose an avatar :</p>
      <div className="flex flex-wrap justify-center py-3">
        {avatars.length > 0 &&
          avatars.map((avatar, i) => {
            return (
              <div
                key={i}
                className="hover:border-twitter group relative my-2 mr-3 h-[50px] w-[50px] rounded-full border-4 transition-none ease-in-out hover:scale-125"
                onClick={() => onAvatarClick(i + 1)}
              >
                {avatar}
                <div
                  className={classNames(
                    "group-hover:border-twitter border-twitter absolute top-1/2 left-1/2  flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-4 bg-neutral-700/40 group-hover:flex",
                    {
                      "hidden border-white": current !== `/avatars/${i}.svg`,
                    }
                  )}
                >
                  <CheckIcon height={25} />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
const EditProfileForm = () => {
  const { setEditModal } = useEditProfile()
  const { user, setUser } = useAppContext()
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [profilename, setProfileName] = useState(user.profilename)
  const [bio, setBio] = useState(user.bio || "")
  const [image, setImage] = useState(user.image)
  const handleChangeProfileName = (e) => {
    if (e.target.value.length <= PROFILENAME_MAX_CHAR) {
      setProfileName(e.target.value)
    }
  }
  const handleChangeBio = (e) => {
    if (e.target.value.length <= BIO_MAX_CHAR) {
      setBio(e.target.value)
    }
  }
  const handleChangeAvatar = (e) => {
    setImage(`/avatars/${e}.svg`)
    setShowAvatarPicker(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    api.post("/user/me", { bio, profilename, image }).then(() => {
      setUser({
        ...user,
        bio,
        profilename,
        image,
      })
      setEditModal(false)
    })
  }
  const handleCloseAvatarPicker = () => setShowAvatarPicker(false)
  const handleCloseModal = () => setEditModal(false)

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 p-4 text-white">
        <div className="relative">
          <div
            onClick={() => setShowAvatarPicker(true)}
            className="group relative h-[100px] w-[100px] rounded-full border-4 sm:h-[150px] sm:w-[150px]"
          >
            <Image
              src={image}
              width={150}
              height={150}
              className="rounded-full bg-gray-300"
              alt="Votre avatar"
            />
            <div className="group-hover:border-twitter absolute top-1/2 left-1/2 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-4 bg-neutral-700/70 sm:h-[150px] sm:w-[150px]">
              <CameraIcon height={50} />
            </div>
          </div>

          {showAvatarPicker && (
            <AvatarPicker
              onAvatarClick={handleChangeAvatar}
              close={handleCloseAvatarPicker}
              current={image}
            />
          )}
        </div>
        <div className="flex justify-between">
          Profilename{" "}
          <span className="text-sm text-gray-500">
            {profilename.length} / {PROFILENAME_MAX_CHAR}
          </span>
        </div>
        <input
          type="text"
          name="profilename"
          placeholder="Profilename"
          onChange={handleChangeProfileName}
          value={profilename}
          className="w-full rounded-md border border-white bg-black py-2 px-3 focus:border-[#1d9bf0] focus:outline-none"
        />
        <div className="flex justify-between">
          Bio{" "}
          <span className="text-sm text-gray-500">
            {bio.length} / {BIO_MAX_CHAR}
          </span>
        </div>
        <textarea
          rows={3}
          value={bio}
          onChange={handleChangeBio}
          className="w-full resize-none rounded-md border border-white bg-black py-2 px-3 focus:border-[#1d9bf0] focus:outline-none"
          placeholder="Your bio..."
        />
        <div className="flex items-center justify-center space-x-4 pt-2 text-lg sm:pt-8">
          <button
            className="w-fit self-center rounded-full border px-6 py-1 hover:border-red-600 hover:bg-red-600/10 hover:text-red-600"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-twitter w-fit self-center rounded-full px-6 py-1 hover:bg-[#1a8cd8]"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditProfileForm

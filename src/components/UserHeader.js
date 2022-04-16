import Image from "next/image"
import { CalendarIcon } from "@heroicons/react/solid"
import Date from "./Date"
import { useAppContext } from "./AppContext"
import { useState } from "react"
import api from "@/services/api"
import classNames from "classnames"

const UserHeader = ({ user }) => {
  const { username, profilename, image, bio, stats, joined } = user
  const { user: currentUser, setUser } = useAppContext()
  const [followersCount, setFollowersCount] = useState(stats.followers)
  const isFollowed = currentUser.following.includes(user.id)

  const [following, setFollowing] = useState(false)
  const handleFollow = () => {
    setFollowing(true)
    api.post(`/user/${user.id}/follow`).then(() => {
      if (isFollowed) {
        setFollowersCount(followersCount - 1)
        setUser({
          ...currentUser,
          following: currentUser.following.filter(
            (follow) => follow !== user.id
          ),
        })
      } else {
        setFollowersCount(followersCount + 1)
        setUser({
          ...currentUser,
          following: currentUser.following.concat(user.id),
        })
      }

      setFollowing(false)
    })
  }

  return (
    <div className="flex w-full flex-col items-start space-y-8 border-b border-gray-700 py-4 px-5">
      <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-10">
        <div className="flex-shrink-0 ">
          <Image
            src={image}
            width={150}
            height={150}
            className="rounded-full bg-gray-300"
            alt={`avatar de @${username}`}
          />
        </div>

        <div className="flex w-full flex-wrap items-center justify-between space-y-2 sm:w-[70%] sm:flex-col sm:items-start sm:pb-6">
          <div className="max-w-full">
            <p className="truncate text-lg font-bold sm:text-2xl">
              {profilename}
            </p>
            <p className="truncate text-xs text-[#71767b] sm:text-base">
              @{username}
            </p>
          </div>
          <button
            className={classNames(
              "bg-twitter rounded-full px-5 py-1 text-white transition ease-in-out hover:bg-[#1a8cd8]",
              {
                "border border-white bg-transparent hover:border-red-600 hover:bg-red-600/10 hover:text-red-600":
                  isFollowed,
              }
            )}
            onClick={handleFollow}
            disabled={following}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>

      <p className="text-white">{bio || "This user has no bio yet..."}</p>

      <div className="flew flex flex-wrap items-center text-[#71767b]">
        <div className="mr-6">
          <span className="font-bold text-white">{stats.following}</span>{" "}
          Following
        </div>
        <div className="mr-6">
          <span className="font-bold text-white">{followersCount}</span>{" "}
          Followers
        </div>
        <div className="mr-6">
          <span className="font-bold text-white">{stats.tweets}</span> Tweets
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="mb-1 h-5" />{" "}
          <span>
            Joined <Date date={joined} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserHeader

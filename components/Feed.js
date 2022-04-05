import {
  SparklesIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/outline"
import Image from "next/image"
import { useRouter } from "next/router"
import { useAuth } from "../contexts/auth"
import { useState } from "react"
import { LogoutIcon } from "@heroicons/react/solid"
import MobileSidebarLink from "./MobileSidebarLink"
import TweetBox from "./TweetBox"
const Feed = () => {
  const { user } = useAuth()
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false)
  const router = useRouter()

  return (
    <div className="text-white flex-grow sm:border-l sm:border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 bg-black sticky top-0 z-20 border-b border-gray-700">
        <div className={"flex items-center space-x-4"}>
          {window.location.pathname.includes("/status") ? (
            <ArrowLeftIcon
              className="h-5 text-white"
              onClick={() => {
                router.back()
              }}
            />
          ) : (
            <div className={"sm:hidden"}>
              <Image
                src={user.image || "/default-avatar.svg"}
                alt="Your avatar"
                className="rounded-full"
                width={30}
                height={30}
                onClick={() => {
                  setOpenMobileSidebar(true)
                }}
              />
            </div>
          )}
          <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        </div>

        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <TweetBox />
      <div className={"h-[4600px]"}>
        {/* <Post /> */}
        {/*  Children */}
      </div>
      {openMobileSidebar && (
        <div
          className={
            "fadeLeft fixed top-0 bottom-0 left-0 bg-black text-sm min-w-[200px] h-full shadow-md border-r border-gray-700 z-30 flex flex-col items-start justify-start space-y-4 p-4 sm:hidden"
          }
        >
          <div className={"flex items-center justify-between w-full"}>
            <div>Account infos</div>
            <ArrowLeftIcon
              className="h-5 text-white"
              onClick={() => {
                setOpenMobileSidebar(false)
              }}
            />
          </div>
          <div className={"flex items-center space-x-5"}>
            <Image
              src={user.image || "/default-avatar.svg"}
              alt="Your avatar"
              className="rounded-full sm:hidden"
              width={25}
              height={25}
              onClick={() => {
                setOpenMobileSidebar(true)
              }}
            />
            <div>
              <div className="font-bold truncate max-w-[130px]">
                {user.profilename || user.username}
              </div>
              <div className="text-[#6e767d] truncate max-w-[130px]">
                @{user.username}
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4 mb-2.5 border-y border-gray-700 w-full py-4">
            <MobileSidebarLink text={"Profile"} Icon={UserIcon} />
            <MobileSidebarLink text={"Lists"} Icon={ClipboardListIcon} />
            <MobileSidebarLink text={"Bookmarks"} Icon={BookmarkIcon} />
            <MobileSidebarLink text={"Settings"} Icon={CogIcon} />
          </div>

          <MobileSidebarLink
            text={"Log out"}
            Icon={LogoutIcon}
            link={"/logout"}
          />
        </div>
      )}
    </div>
  )
}

export default Feed

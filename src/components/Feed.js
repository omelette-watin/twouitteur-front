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
import { useAppContext } from "./AppContext"
import { useState, useCallback } from "react"
import { LogoutIcon } from "@heroicons/react/solid"
import MobileSidebarLink from "./MobileSidebarLink"
import TweetBox from "./TweetBox/TweetBox"

const Feed = () => {
  const { user } = useAppContext()
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false)
  const router = useRouter()
  const isStatusPage = router.pathname.startsWith("/status")
  const handleGoBack = useCallback(() => router.back(), [router])
  const handleOpenMobileSidebar = useCallback(
    () => setOpenMobileSidebar(true),
    []
  )
  const handleCloseMobileSidebar = useCallback(
    () => setOpenMobileSidebar(false),
    []
  )

  return (
    <div className="max-w-2xl flex-grow border-gray-700 text-white sm:ml-[73px] sm:border-l sm:border-r xl:ml-[370px]">
      <div className="sticky top-0 z-20 flex items-center border-b border-gray-700 bg-black py-2 px-3 text-[#d9d9d9] sm:justify-between">
        <div className="flex items-center space-x-4">
          {isStatusPage ? (
            <ArrowLeftIcon className="h-5 text-white" onClick={handleGoBack} />
          ) : (
            <div className="sm:hidden">
              <Image
                src={user.image || "/default-avatar.svg"}
                alt="Your avatar"
                className="rounded-full"
                width={30}
                height={30}
                onClick={handleOpenMobileSidebar}
              />
            </div>
          )}
          <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        </div>
        <div className="hoverAnimation ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <div className="border-b border-gray-700">
        <TweetBox />
      </div>
      <div className="h-[4600px]"></div>
      {openMobileSidebar && (
        <div className="fadeLeft fixed top-0 bottom-0 left-0 z-30 flex h-full min-w-[200px] flex-col items-start justify-start space-y-4 border-r border-gray-700 bg-black p-4 text-sm shadow-md sm:hidden">
          <div className="flex w-full items-center justify-between">
            <div>Account infos</div>
            <ArrowLeftIcon
              className="h-5 text-white"
              onClick={handleCloseMobileSidebar}
            />
          </div>
          <div className="flex items-center space-x-5">
            <Image
              src={user.image || "/default-avatar.svg"}
              alt="Your avatar"
              className="rounded-full sm:hidden"
              width={25}
              height={25}
              onClick={handleOpenMobileSidebar}
            />
            <div>
              <div className="max-w-[130px] truncate font-bold">
                {user.profilename || user.username}
              </div>
              <div className="max-w-[130px] truncate text-[#6e767d]">
                @{user.username}
              </div>
            </div>
          </div>
          <div className="mt-4 mb-2.5 w-full space-y-2 border-y border-gray-700 py-4">
            <MobileSidebarLink Icon={UserIcon}>Profile</MobileSidebarLink>
            <MobileSidebarLink Icon={ClipboardListIcon}>
              Lists
            </MobileSidebarLink>
            <MobileSidebarLink Icon={BookmarkIcon}>Bookmarks</MobileSidebarLink>
            <MobileSidebarLink Icon={CogIcon}>Settings</MobileSidebarLink>
          </div>
          <MobileSidebarLink Icon={LogoutIcon} link="/logout">
            Logout
          </MobileSidebarLink>
        </div>
      )}
    </div>
  )
}

export default Feed

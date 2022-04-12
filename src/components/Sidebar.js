import Image from "next/image"
import SidebarLink from "./SidebarLink"
import { HomeIcon, LogoutIcon } from "@heroicons/react/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline"
import { useAppContext } from "./AppContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTweetModal } from "./TweetModalContext"
import { useCallback } from "react"

const Sidebar = () => {
  const { user } = useAppContext()
  const { setToggleModal } = useTweetModal()
  const router = useRouter()
  const isActive = (pathname) => {
    return router.pathname.startsWith(pathname)
  }
  const handleOpenTweetModal = useCallback(() => setToggleModal(true), [])

  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image
          src="/twouitteur-white.svg"
          width={30}
          height={30}
          alt="twouitteur logo"
        />
      </div>
      <div className="mt-4 mb-2.5 space-y-2 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active={isActive("/")} />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button
        className="ml-auto mt-2 hidden h-[52px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline"
        onClick={handleOpenTweetModal}
      >
        Tweet
      </button>
      <div className="hoverAnimation mt-auto flex items-center justify-center text-[#d9d9d9] xl:ml-24 xl:w-[244px] xl:justify-start">
        <Image
          src={user.image || "/default-avatar.svg"}
          alt="Your avatar"
          className="rounded-full"
          width={30}
          height={30}
        />
        <div className="hidden leading-5 xl:ml-3 xl:inline ">
          <p className="truncate font-bold xl:max-w-[130px]">
            {user.profilename || user.username}
          </p>
          <p className="truncate text-[#6e767d] xl:max-w-[130px]">
            @{user.username}
          </p>
        </div>
        <Link href="/logout">
          <a title="Log out" className="ml-auto hidden xl:inline">
            <LogoutIcon className="h-5" title="Log out" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

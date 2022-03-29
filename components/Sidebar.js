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
import { useAuth } from "../contexts/auth"
import Link from "next/link"
const Sidebar = () => {
  const { user } = useAuth()
  const isActive = (pathname) => {
    return pathname === window.location.pathname
  }

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image
          src={"/twouitteur-white.svg"}
          width={30}
          height={30}
          alt={"twouitteur logo"}
        />
      </div>
      <div className="space-y-2 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active={isActive("/")} />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="hidden xl:inline ml-auto mt-2 bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:justify-start xl:ml-24 xl:w-[244px]">
        <Image
          src={user.image || "/default-avatar.svg"}
          alt="Your avatar"
          className="rounded-full"
          width={30}
          height={30}
        />
        <div className="hidden xl:inline leading-5 xl:ml-3 ">
          <p className="font-bold truncate xl:max-w-[130px]">
            {user.profilename || user.username}
          </p>
          <p className="text-[#6e767d] truncate xl:max-w-[130px]">
            @{user.username}
          </p>
        </div>
        <Link href={"/logout"}>
          <a title={"Log out"} className={"hidden xl:inline ml-auto"}>
            <LogoutIcon className={"h-5"} title={"Log out"} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

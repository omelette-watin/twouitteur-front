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
import { useTweetModal } from "./TweetModalContext"

const Sidebar = () => {
  const { user } = useAppContext()
  const { setTweetModal } = useTweetModal()
  const isActive = (pathname) => {
    return window.location.pathname === pathname
  }
  const handleOpenTweetModal = () =>
    setTweetModal({
      visible: true,
      replying: false,
    })

  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Link href={"/"}>
          <a>
            <Image
              src="/twouitteur-white.svg"
              width={30}
              height={30}
              alt="twouitteur logo"
            />
          </a>
        </Link>
      </div>
      <div className="mt-4 mb-2.5 space-y-2 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active={isActive("/")} />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink
          text="Profile"
          Icon={UserIcon}
          link={`/${user.username}`}
          active={isActive(`/${user.username}`)}
        />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button
        className="bg-twitter ml-auto mt-2 hidden h-[52px] w-56 rounded-full text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline"
        onClick={handleOpenTweetModal}
      >
        Tweet
      </button>
      <button
        className="bg-twitter mt-2 flex items-center justify-center rounded-full p-3 text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:hidden"
        onClick={handleOpenTweetModal}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-white"
          fill="white"
        >
          <g>
            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
          </g>
        </svg>
      </button>
      <div className="hoverAnimation mt-auto flex items-center justify-center text-[#d9d9d9] xl:ml-24 xl:w-[244px] xl:justify-start">
        <Image
          src={user.image}
          alt="Your avatar"
          className="rounded-full bg-gray-300"
          width={36}
          height={36}
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

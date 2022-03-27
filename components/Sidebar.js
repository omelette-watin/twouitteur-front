import Image from "next/image"
import SidebarLink from "./SidebarLink"
import { HomeIcon } from "@heroicons/react/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline"
import { useAuth } from "../contexts/auth"
import Link from "next/link"
import { useState } from "react"
const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()

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
        <SidebarLink text="Home" Icon={HomeIcon} active />
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
      <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:justify-start xl:ml-24 xl:w-[244px] relative">
        <Image
          src={"/default-avatar.svg"}
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
            @{user.username}azeaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
        <DotsHorizontalIcon
          className="h-5 hidden xl:inline ml-auto"
          onClick={() => {
            setModalOpen(!modalOpen)
          }}
        />
      </div>
      <div
        className={`${
          modalOpen ? "block" : "hidden"
        } absolute z-100 bg-black border-[1px] pb-1 border-white shadow-lg shadow-neutral-900 rounded-xl divide-y divide-border-gray-700 text-white bottom-[80px] left-10 xl:left-40 w-[244px]`}
      >
        <div className={"flex items-center p-3"}>
          <Image
            src={"/default-avatar.svg"}
            alt="Your avatar"
            className="rounded-full"
            width={30}
            height={30}
          />
          <div className="inline leading-5 ml-3 ">
            <p className="font-bold truncate max-w-[130px]">
              {user.profilename || user.username}
            </p>
            <p className="text-[#6e767d] truncate max-w-[130px]">
              @{user.username}azeaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
        </div>
        <div className={"flex flex-col items-center text-center"}>
          <Link href={"/logout"}>
            <a
              className={
                "hover:text-[#1d9bf0] hover:underline underline-offset-2 w-full py-2 transition 200ms ease-in-out"
              }
            >
              Log out @{user.username}
            </a>
          </Link>
          <span
            className={
              "hover:text-[#1d9bf0] hover:underline underline-offset-2 w-full py-2 pr-3 transition 200ms ease-in-out cursor-pointer"
            }
            onClick={() => {
              setModalOpen(false)
            }}
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

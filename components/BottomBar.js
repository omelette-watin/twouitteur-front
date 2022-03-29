import React from "react"
import SidebarLink from "./SidebarLink"
import { HomeIcon } from "@heroicons/react/solid"
import { BellIcon, InboxIcon, SearchIcon } from "@heroicons/react/outline"

const BottomBar = () => {
  return (
    <div
      className={
        "flex items-center justify-around py-2 sm:hidden border-t border-gray-700 fixed bottom-0 right-0 left-0"
      }
    >
      <SidebarLink text="Home" Icon={HomeIcon} link={"/"} />
      <SidebarLink text="Explore" Icon={SearchIcon} />
      <SidebarLink text="Notifications" Icon={BellIcon} />
      <SidebarLink text="Messages" Icon={InboxIcon} />
      <button className="absolute bg-[#1d9bf0] text-white flex items-center justify-center p-3 rounded-full text-lg font-bold shadow-md hover:bg-[#1a8cd8] -top-[80px] right-5">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-7 w-7 text-white"
          fill={"white"}
        >
          <g>
            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
          </g>
        </svg>
      </button>
    </div>
  )
}

export default BottomBar
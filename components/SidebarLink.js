import Link from "next/link"

const SidebarLink = ({ Icon, text, active, link = "/" }) => {
  return (
    <Link href={link}>
      <a className="block">
        <div
          title={text}
          className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
            active && "font-bold"
          }`}
        >
          <Icon className="h-7" />
          <span className="hidden xl:inline">{text}</span>
        </div>
      </a>
    </Link>
  )
}

export default SidebarLink

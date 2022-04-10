import Link from "next/link"
import classNames from "classnames"

const SidebarLink = ({ Icon, text, active, link = "/" }) => {
  return (
    <Link href={link}>
      <a className="block">
        <div
          title={text}
          className={classNames(
            "hoverAnimation flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start",
            {
              "font-bold": active
            }
          )}

        >
          <Icon className="h-7" />
          <span className="hidden xl:inline">{text}</span>
        </div>
      </a>
    </Link>
  )
}

export default SidebarLink

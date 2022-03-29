import Link from "next/link"

const MobileSidebarLink = ({ Icon, text, link = "/" }) => {
  return (
    <Link href={link}>
      <a className="block">
        <div
          title={text}
          className={
            "text-[#d9d9d9] font-sm flex items-center justify-start space-x-3"
          }
        >
          <Icon className="h-4" />
          <span>{text}</span>
        </div>
      </a>
    </Link>
  )
}

export default MobileSidebarLink

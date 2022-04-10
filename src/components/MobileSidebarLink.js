import Link from "next/link"

const MobileSidebarLink = ({ Icon, children, link = "/" }) => {
  return (
    <Link href={link}>
      <a className="block">
        <div className="font-sm flex items-center justify-start space-x-3 text-[#d9d9d9]">
          <Icon className="h-4" />
          <span>{children}</span>
        </div>
      </a>
    </Link>
  )
}

export default MobileSidebarLink

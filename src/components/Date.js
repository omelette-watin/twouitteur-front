import ReactTimeAgo from "react-time-ago"
import { parseISO, format } from "date-fns"

const Date = ({ date, full }) => {
  return (
    <time>
      <ReactTimeAgo date={date} locale="en-US" timeStyle={!full && "twitter"} />
    </time>
  )
}

export const FullDate = ({ date }) => {
  return <time>{format(parseISO(date), "H:m · MMM d, y")}</time>
}

export default Date

import ReactTimeAgo from "react-time-ago"

const Date = ({ date }) => {
  return (
    <time>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
    </time>
  )
}

export default Date

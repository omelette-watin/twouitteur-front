import { useSelector } from "usetheform"
const ProgressRing = ({
  textLabel,
  colorBar = "#1da1f2",
  radius = 20,
  stroke = 2,
  progress = 0,
  hideRingBar,
}) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const transform = `translate(0 ${radius * 2}) rotate(-90 0 0)`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      {!hideRingBar && (
        <g transform={transform}>
          <circle
            stroke="#ebeef0"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={colorBar}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            r={normalizedRadius}
            style={{ strokeDashoffset }}
            cx={radius}
            cy={radius}
          />
        </g>
      )}
      {textLabel && (
        <text fill={colorBar} x="50%" y="50%" textAnchor="middle" dy=".3em">
          {textLabel}
        </text>
      )}
    </svg>
  )
}
const colors = { warning: "#ffad1f", error: "#e0245e", success: "#1da1f2" }
export function getColors(numOfChars, max, warning) {
  switch (true) {
    case numOfChars >= 0 && numOfChars < max - warning: {
      return colors.success
    }

    case numOfChars >= max - warning && numOfChars <= max: {
      return colors.warning
    }

    default:
      return colors.error
  }
}
const WARNING_AFTER = 10
export const getProgressRingBarProps = (
  plainText = "",
  maxChars,
  warningLimit = WARNING_AFTER
) => {
  const { length = 0 } = plainText
  const progress = Math.min((100 * length) / maxChars, 100)
  const warningRange = (maxChars * warningLimit) / 100
  const colorBar = getColors(length, maxChars, warningRange)
  const uiStatus = length >= maxChars - warningRange ? "bigRing" : "smallRing"
  const textLabel = uiStatus === "bigRing" && `${maxChars - length}`
  const hideRingBar = length - maxChars > warningLimit

  return { progress, textLabel, hideRingBar, colorBar, uiStatus }
}

export const CharacterCounter = ({ maxChars }) => {
  const [plainText] = useSelector((state) => state.editor.plainText)
  const { uiStatus, ...propsRingBar } = getProgressRingBarProps(
    plainText,
    maxChars
  )

  return (
    <div data-ui={uiStatus} className="ProgressRingBar">
      <ProgressRing {...propsRingBar} />
    </div>
  )
}

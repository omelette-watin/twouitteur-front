import { useForm } from "usetheform"
import { EmojiPicker } from "./EmojiPicker"

export const MediaBar = () => {
  const { state } = useForm

  return (
    <div className={"flex items-center"}>
      <EmojiPicker />
    </div>
  )
}

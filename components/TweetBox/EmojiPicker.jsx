import { useSelector } from "usetheform"
import { EditorState, Modifier } from "draft-js"
import { useClickOutPicker } from "./PrivacyPicker"
import emojisvg from "../../public/emoji-picker.svg"
import Picker from "emoji-picker-react"
import Image from "next/image"
import { useState } from "react"

export const EmojiPicker = ({ disabled }) => {
  const [showEmojiPicker, togglePicker] = useState(false)
  const [editor, setEditor] = useSelector((state) => state.editor)
  const toggleEmojiPicker = () => togglePicker((prev) => !prev)
  const onEmojiClick = (e, emojiObj) => {
    e.preventDefault()
    const { editorState, refEditor } = editor
    const contentState = editorState?.getCurrentContent()
    const targetRange = editorState?.getSelection()
    const modifierAPI = targetRange.isCollapsed()
      ? Modifier.insertText
      : Modifier.replaceText
    const newContentState = modifierAPI(
      contentState,
      targetRange,
      emojiObj.emoji
    )
    const newEditorState = EditorState.push(editorState, newContentState)
    setEditor((prev) => ({ ...prev, editorState: newEditorState }))
    toggleEmojiPicker()
    setTimeout(() => refEditor.current.focus(), 100)
  }
  const refPicker = useClickOutPicker(() => {
    showEmojiPicker && togglePicker(false)
  })

  return (
    <div ref={refPicker} className={"relative"} title={"Choose an emoji"}>
      <button
        disabled={disabled}
        type={"button"}
        className={
          "hover:bg-[#1d9bf0]/10 rounded-full flex items-center justify-center p-2 transition 200ms ease-in-out"
        }
        onClick={toggleEmojiPicker}
      >
        <Image src={emojisvg} alt={"Add emoji"} />
      </button>
      {showEmojiPicker && (
        <div className="absolute z-10 text-black">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  )
}

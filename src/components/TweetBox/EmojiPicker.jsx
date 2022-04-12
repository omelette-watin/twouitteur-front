import { useSelector } from "usetheform"
import { EditorState, Modifier } from "draft-js"
import { useClickOutPicker } from "@/components/TweetBox/PrivacyPicker"
import Image from "next/image"
import { useState } from "react"
let Picker

if (typeof window !== "undefined") {
  import("emoji-picker-react").then((_module) => {
    Picker = _module.default
  })
}

const EmojiPicker = ({ disabled }) => {
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
    <div ref={refPicker} className="relative" title="Choose an emoji">
      <button
        disabled={disabled}
        type="button"
        className={
          "hover:bg-twitter/10 flex items-center justify-center rounded-full p-2 transition ease-in-out"
        }
        onClick={toggleEmojiPicker}
      >
        <Image
          src="/emoji-picker.svg"
          width={24}
          height={24}
          alt="Add emoji"
          className="h-[24px] w-[24px]"
        />
      </button>
      {showEmojiPicker && (
        <div className="absolute z-10 text-black">
          <Picker
            onEmojiClick={onEmojiClick}
            preload
            searchPlaceholder="Search an emoji"
            pickerStyle={{
              boxShadow: "none",
            }}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPicker

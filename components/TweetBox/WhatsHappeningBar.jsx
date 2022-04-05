import { Collection, useField, Input } from "usetheform"
import { useCallback, useMemo, useRef } from "react"
import { Editor, EditorState, CompositeDecorator } from "draft-js"

const limitTo = (limit) => (editorState) => {
  const { length = 0 } = editorState?.plainText || ""

  return length <= 0 || length > limit ? "out of limits" : undefined
}
const extractPlainText = (editor) => {
  const editorState = editor?.editorState
  const currentContent = editorState?.getCurrentContent?.()
  const plainText = currentContent?.getPlainText?.("") || ""

  return { ...editor, plainText }
}
const createHighlightDecorator = (regex) => {
  function hashTagStrategy(contentBlock, callback) {
    const text = contentBlock.getText()
    let matchArr, start

    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index
      callback(start, start + matchArr[0].length)
    }
  }

  return {
    strategy: hashTagStrategy,
    component: HashTag,
  }
}
const createOverLimitDecorator = (maxChars) => {
  function overLimitStrategy(contentBlock, callback) {
    const text = contentBlock.getText()
    const { length } = text

    if (length >= maxChars) {
      callback(maxChars, length)
    }
  }

  return {
    strategy: overLimitStrategy,
    component: OverLimit,
  }
}
function OverLimit({ children }) {
  return <span className="bg-orange-500">{children}</span>
}

function HashTag({ children }) {
  return <span className="text-[#1B95E0]">{children}</span>
}
const detectHashtag = /(?:\s|^)(#[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)/gi
const detectMention = /(?:\s|^)(@[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)/gi
const detectURL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
const composeDecorators = (maxChars) =>
  new CompositeDecorator([
    createOverLimitDecorator(maxChars),
    createHighlightDecorator(detectHashtag),
    createHighlightDecorator(detectMention),
    createHighlightDecorator(detectURL),
  ])
const DraftEditor = ({ maxChars, placeholder, name = "editorState" }) => {
  const initialState = useMemo(
    () => EditorState.createEmpty(composeDecorators(maxChars)),
    [maxChars]
  )
  const { value, setValue } = useField({
    type: "custom",
    name,
    value: initialState,
  })
  const onInputChange = useCallback(
    (editorState) => setValue(editorState),
    [setValue]
  )
  const refEditor = useRef(null)
  useField({
    type: "custom",
    name: "refEditor",
    value: refEditor,
  })

  return (
    <div
      className={
        "block relative overflow-hidden text-left py-3 px-3 text-white min-h-[24px]"
      }
    >
      <Editor
        editorState={value}
        onChange={onInputChange}
        placeholder={placeholder}
        ref={refEditor}
      />
    </div>
  )
}

export const WhatsHappeningBar = ({ maxChars, placeholder }) => {
  return (
    <>
      <Collection
        object
        name={"editor"}
        validators={[limitTo(maxChars)]}
        reducers={extractPlainText}
      >
        <DraftEditor
          name={"editorState"}
          maxChars={maxChars}
          placeholder={placeholder}
        />
        <Input type={"hidden"} name={"plainText"} />
      </Collection>
    </>
  )
}

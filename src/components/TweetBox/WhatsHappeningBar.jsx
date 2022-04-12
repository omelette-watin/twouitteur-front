import { Collection, useField, Input } from "usetheform"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"
import { Editor, EditorState, CompositeDecorator } from "draft-js"
import Tag from "../Tag"

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
  function tagStrategy(contentBlock, callback) {
    const text = contentBlock.getText()
    let matchArr, start

    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index
      callback(start, start + matchArr[0].length)
    }
  }

  return {
    strategy: tagStrategy,
    component: Tag,
  }
}
const detectHashtag = /\B(#[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)(?![0-9A-Za-zÀ-ÖØ-öø-ÿ_-])/g
const detectMention = /\B(@[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+)(?![0-9A-Za-zÀ-ÖØ-öø-ÿ_-])/g
const detectURL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
const composeDecorators = () =>
  new CompositeDecorator([
    createHighlightDecorator(detectHashtag),
    createHighlightDecorator(detectMention),
    createHighlightDecorator(detectURL),
  ])
// eslint-disable-next-line react/display-name
const DraftEditor = forwardRef(({ placeholder, name = "editorState" }, ref) => {
  const initialState = EditorState.createEmpty(composeDecorators())
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

  useImperativeHandle(ref, () => ({
    reset() {
      setValue(() => EditorState.createEmpty(composeDecorators()))
    },
  }))

  return (
    <div
      className={
        "relative block min-h-[24px] overflow-hidden py-3 text-left text-lg text-white"
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
})
// eslint-disable-next-line react/display-name
const WhatsHappeningBar = forwardRef(({ maxChars, placeholder }, ref) => {
  return (
    <>
      <Collection
        object
        name="editor"
        validators={[limitTo(maxChars)]}
        reducers={extractPlainText}
      >
        <DraftEditor
          ref={ref}
          name="editorState"
          maxChars={maxChars}
          placeholder={placeholder}
        />
        <Input type="hidden" name="plainText" />
      </Collection>
    </>
  )
})

export default WhatsHappeningBar

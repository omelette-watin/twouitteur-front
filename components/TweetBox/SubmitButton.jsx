import { useForm } from "usetheform"

export const SubmitButton = () => {
  const { isValid, pristine, state } = useForm()
  const isEmpty = !state.editor?.plainText && !state.media && !state.gif

  return (
    <button
      className={
        "py-1 px-4 outline-none border-0 bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-2xl flex items-center cursor-pointer disabled:cursor-default disabled:bg-[#8ED0F9FF]"
      }
      disabled={!isValid || pristine || isEmpty}
      type="submit"
    >
      <span>Tweet</span>
    </button>
  )
}

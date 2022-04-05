import { useForm } from "usetheform"

export const SubmitButton = ({ submitting }) => {
  const { isValid, pristine, state } = useForm()
  const isEmpty = !state.editor?.plainText && !state.media && !state.gif

  return (
    <button
      className={
        "py-1 px-4 font-semibold text-lg outline-none border-0 bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-full flex items-center cursor-pointer disabled:cursor-default disabled:bg-neutral-500"
      }
      disabled={!isValid || pristine || isEmpty || submitting}
      type="submit"
    >
      <span>Tweet</span>
    </button>
  )
}

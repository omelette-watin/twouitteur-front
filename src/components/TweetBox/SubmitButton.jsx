import { useForm } from "usetheform"

const SubmitButton = ({ submitting }) => {
  const { isValid, pristine, state } = useForm()
  const isEmpty = !state.editor?.plainText && !state.media && !state.gif

  return (
    <button
      className="bg-twitter flex cursor-pointer items-center rounded-full border-0 py-1 px-4 text-lg font-semibold hover:bg-[#1a8cd8] disabled:cursor-default disabled:bg-neutral-500"
      disabled={!isValid || pristine || isEmpty || submitting}
      type="submit"
    >
      <span>Tweet</span>
    </button>
  )
}

export default SubmitButton

import { useForm } from "usetheform"

const SubmitButton = ({ submitting }) => {
  const { isValid, pristine, state } = useForm()
  const isEmpty = !state.editor?.plainText && !state.media && !state.gif

  return (
    <button
      className="bg-twitter hover:bg-twitter disabled:bg-twitter/50 flex cursor-pointer items-center rounded-full border-0 py-1 px-4 text-lg font-semibold disabled:cursor-default"
      disabled={!isValid || pristine || isEmpty || submitting}
      type="submit"
    >
      <span>Tweet</span>
    </button>
  )
}

export default SubmitButton

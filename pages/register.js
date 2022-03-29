import { Formik, useField, Form } from "formik"
import GalaxyBg from "../components/GalaxyBg"
import { useState } from "react"
import Image from "next/image"
import { object, ref, string } from "yup"
import Loading from "../components/Loading"
import Link from "next/link"
import Head from "next/head"
import api from "../services/api"

const registerSchema = object({
  username: string()
    .required("Required")
    .trim()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be less than 15 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  email: string().required("Required").email("Invalid email"),
  password: string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(40, "Must be less than 40 characters")
    .matches(
      /\d/,
      "Must contain at least 1 upper case, 1 lower case and one number"
    )
    .matches(
      /[A-ZÀ-Ö]/,
      "Must contain at least 1 upper case, 1 lower case and one number"
    )
    .matches(
      /[a-zØ-öø-ÿ]/,
      "Must contain at least 1 upper case, 1 lower case and one number"
    ),
  confirmPassword: string()
    .required("Required")
    .oneOf([ref("password")], "Passwords must match"),
})
export const Input = (props) => {
  const [field, meta] = useField(props)
  const [didFocus, setDidFocus] = useState(false)
  const handleFocus = () => setDidFocus(true)
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched

  return (
    <>
      <div className={`relative`}>
        <span
          className={`absolute  ${
            !meta.error && meta.value
              ? "text-green-500 text-lg font-extrabold"
              : "text-orange-500 text-md font-semibold"
          }  ml-2 inset-y-0 right-2 z-2 flex items-center`}
        >
          {!meta.error && showFeedback ? "✓" : "*"}
        </span>
        <input
          {...props}
          {...field}
          className={`rounded-md py-1 xl:py-2 px-3 w-52 md:w-64 xl:w-80 font-medium text-md placeholder:font-medium my-2 ${
            showFeedback
              ? meta.error
                ? "border-[2px] border-orange-500 outline-none"
                : ""
              : ""
          } `}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
      </div>
      {showFeedback && meta.error ? (
        <div className="flex items-center space-between ml-1 -mt-1 bounce w-48 xl:w-72">
          <p
            id={`${props.id}-feedback`}
            aria-live="polite"
            className={"text-orange-500 text-sm"}
          >
            {meta.error}
          </p>
        </div>
      ) : null}{" "}
    </>
  )
}
const Register = () => {
  const [submitting, setSubmitting] = useState(false)

  return (
    <GalaxyBg>
      <div className="flex flex-col items-center justify-center space-y-6 text-white bg-neutral-900/[.85] rounded-lg px-8 pt-8 pb-2 shadow-md fadeUp">
        <Head>
          <title>Sign up - Twouitteur</title>
        </Head>
        <Image
          src={"/twouitteur.svg"}
          width={50}
          height={50}
          alt={"twouitteur logo"}
        />
        <h2 className="text-3xl font-semibold">Sign-up</h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            setSubmitting(true)
            api
              .post("auth/register", values)
              .then(({ data }) => {
                const token = data.token
                localStorage.setItem("token", token)
                window.location.pathname = "/"
              })
              .catch((err) => {
                if (
                  err.response.data.mailError &&
                  err.response.data.usernameError
                ) {
                  setErrors({
                    email: "This email is already used",
                    username: "This username is already used",
                  })
                } else if (err.response.data.mailError) {
                  setErrors({ email: "This email is already used" })
                } else if (err.response.data.usernameError) {
                  setErrors({ username: "This username is already used" })
                } else {
                  setErrors({ server: true })
                }

                setSubmitting(false)
              })
          }}
          validationSchema={registerSchema}
        >
          {({ isValid, dirty, errors }) => (
            <Form className="space-y-8 divide-y divide-gray-700">
              <div className="flex flex-col text-black">
                <Input
                  placeholder={"Username"}
                  name={"username"}
                  type={"text"}
                />
                <Input placeholder={"Email"} name={"email"} type={"text"} />
                <Input
                  placeholder={"Password"}
                  name={"password"}
                  type={"password"}
                />
                <Input
                  placeholder={"ConfirmPassword"}
                  name={"confirmPassword"}
                  type={"password"}
                />
              </div>
              {errors.server && (
                <div className="flex items-center space-between ml-1 -mt-1 bounce w-48 xl:w-72">
                  <p aria-live="polite" className={"text-orange-500 text-sm"}>
                    Something went wrong, please retry later
                  </p>
                </div>
              )}
              <div className="space-y-3 flex flex-col items-center text-white py-8">
                <button
                  className={`block bg-[#1d9bf0] rounded-full w-52 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] hover:scale-95 disabled:bg-neutral-500 disabled:scale-100 transition duration-200 ease-out`}
                  type="submit"
                  disabled={!isValid || !dirty || submitting}
                >
                  {submitting ? (
                    <span>
                      Sending ... <Loading color={"white"} size={5} />
                    </span>
                  ) : (
                    "Sign-up"
                  )}
                </button>
                <div className="text-l">You have an account?</div>
                <Link href={"/login"}>
                  <a>
                    <button className="block bg-white text-black rounded-full w-48 h-[52px] text-lg font-bold shadow-md hover:bg-slate-300 hover:scale-95 transition duration-200 ease-out">
                      Sign-in
                    </button>
                  </a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </GalaxyBg>
  )
}

export default Register

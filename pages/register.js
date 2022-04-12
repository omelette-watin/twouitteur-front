import { Formik, useField, Form } from "formik"
import GalaxyBg from "@/components/GalaxyBg"
import { useState } from "react"
import Image from "next/image"
import { object, ref, string } from "yup"
import Loading from "@/components/Loading"
import Link from "next/link"
import Head from "next/head"
import api from "@/services/api"
import classNames from "classnames"
import { useRouter } from "next/router"

const registerSchema = object({
  username: string()
    .required("Required")
    .trim()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be less than 15 characters")
    .matches(
      /^[0-9A-Za-zÀ-ÖØ-öø-ÿ_-]+$/,
      "Cannot contain special characters or spaces"
    ),
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
const Register = () => {
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  return (
    <GalaxyBg>
      <div className="fadeUp flex flex-col items-center justify-center space-y-6 rounded-lg bg-neutral-900/[.85] px-8 pt-8 pb-2 text-white shadow-md">
        <Head>
          <title>Sign up - Twouitteur</title>
        </Head>
        <Image
          src="/twouitteur.svg"
          width={50}
          height={50}
          alt="twouitteur logo"
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
                router.push("/")
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
                <Input placeholder="Username" name="username" type="text" />
                <Input placeholder="Email" name="email" type="text" />
                <Input placeholder="Password" name="password" type="password" />
                <Input
                  placeholder="ConfirmPassword"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              {errors.server && (
                <div className="space-between bounce ml-1 -mt-1 flex w-48 items-center xl:w-72">
                  <p aria-live="polite" className="text-sm text-orange-500">
                    Something went wrong, please retry later
                  </p>
                </div>
              )}
              <div className="flex flex-col items-center space-y-3 py-8 text-white">
                <button
                  className={`bg-twitter block h-[52px] w-52 rounded-full text-lg font-bold shadow-md transition duration-200 ease-out hover:scale-95 hover:bg-[#1a8cd8] disabled:scale-100 disabled:bg-neutral-500`}
                  type="submit"
                  disabled={!isValid || !dirty || submitting}
                >
                  {submitting ? (
                    <span>
                      Sending ... <Loading color="white" size={5} />
                    </span>
                  ) : (
                    "Sign-up"
                  )}
                </button>
                <div className="text-l">You have an account?</div>
                <Link href="/login">
                  <a>
                    <button className="block h-[52px] w-48 rounded-full bg-white text-lg font-bold text-black shadow-md transition duration-200 ease-out hover:scale-95 hover:bg-slate-300">
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
          className={classNames(
            "z-2 absolute inset-y-0 right-2 ml-2 flex items-center",
            {
              "text-lg font-extrabold text-green-500":
                !meta.error && meta.value,
              "text-md font-semibold text-orange-500":
                meta.error || !meta.value,
            }
          )}
        >
          {!meta.error && showFeedback ? "✓" : "*"}
        </span>
        <input
          {...props}
          {...field}
          className={classNames(
            "text-md my-2 w-52 rounded-md py-1 px-3 font-medium placeholder:font-medium md:w-64 xl:w-80 xl:py-2",
            {
              "border-[2px] border-orange-500 outline-none":
                showFeedback && meta.error,
            }
          )}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
      </div>
      {showFeedback && meta.error ? (
        <div className="space-between bounce ml-1 -mt-1 flex w-48 items-center xl:w-72">
          <p
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="text-sm text-orange-500"
          >
            {meta.error}
          </p>
        </div>
      ) : null}
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      unprotected: true,
    },
  }
}

export default Register

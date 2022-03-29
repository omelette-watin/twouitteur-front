import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import GalaxyBg from "../components/GalaxyBg"
import Loading from "../components/Loading"
import api from "../services/api"
import Head from "next/head"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import { Input } from "./register"
const Login = () => {
  const [submitting, setSubmitting] = useState(false)

  return (
    <GalaxyBg>
      <Head>
        <title>Sign in - Twouitteur</title>
      </Head>
      <div className="flex flex-col items-center justify-center space-y-6 text-white bg-neutral-900/[.85] rounded-lg px-8 pt-8 pb-2 shadow-md fadeUp">
        <Image
          src={"/twouitteur.svg"}
          width={50}
          height={50}
          alt={"twouitteur logo"}
        />
        <h2 className="text-3xl font-semibold">Sign-in</h2>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={object({
            username: string().required("Required"),
            password: string().required("Required"),
          })}
          onSubmit={async (values, { setErrors }) => {
            setSubmitting(true)
            api
              .post("auth/login", values)
              .then(({ data }) => {
                const token = data.token
                localStorage.setItem("token", token)
                window.location.pathname = "/"
              })
              .catch((err) => {
                if (err.response && err.response.data.message) {
                  setErrors({ credentials: err.response.data.message })
                } else {
                  setErrors({ server: true })
                }

                setSubmitting(false)
              })
          }}
        >
          {({ errors, dirty, isValid }) => (
            <Form>
              <div className="flex flex-col text-black">
                <Input
                  type="text"
                  name={"username"}
                  placeholder="Username or email"
                />
                <Input
                  type="password"
                  name={"password"}
                  placeholder="Password"
                />
              </div>
              {errors.credentials && (
                <div className="flex items-center space-between ml-1 -mt-1 bounce w-48 xl:w-72">
                  <p aria-live="polite" className={"text-orange-500 text-sm"}>
                    {errors.credentials}
                  </p>
                </div>
              )}
              {errors.server && (
                <div className="flex items-center space-between ml-1 -mt-1 bounce w-48 xl:w-72">
                  <p aria-live="polite" className={"text-orange-500 text-sm"}>
                    Something went wrong, please retry later
                  </p>
                </div>
              )}
              <div className="space-y-3 flex flex-col items-center text-white py-8">
                <button
                  className="block bg-[#1d9bf0] rounded-full w-52 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] hover:scale-95 disabled:bg-neutral-500 disabled:scale-100 transition duration-200 ease-out"
                  type="submit"
                  disabled={submitting || !dirty || !isValid}
                >
                  {submitting ? (
                    <span>
                      Sending ... <Loading color={"white"} size={5} />
                    </span>
                  ) : (
                    "Sign-in"
                  )}
                </button>
                <div className="text-l">Don't have an account?</div>
                <Link href={"/register"}>
                  <a>
                    <button className="block bg-white text-black rounded-full w-48 h-[52px] text-lg font-bold shadow-md hover:bg-slate-300 hover:scale-95 transition duration-200 ease-out">
                      Sign-up
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

export default Login

export async function getServerSideProps() {
  return {
    props: {
      unprotected: true,
      layout: false,
    },
  }
}

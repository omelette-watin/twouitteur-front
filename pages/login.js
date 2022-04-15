import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import GalaxyBg from "@/components/GalaxyBg"
import Loading from "@/components/Loading"
import api from "@/services/api"
import Head from "next/head"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import { Input } from "./register"
import { useRouter } from "next/router"
import { useAppContext } from "@/components/AppContext"

const Login = () => {
  const [submitting, setSubmitting] = useState(false)
  const { setUser } = useAppContext()
  const router = useRouter()

  return (
    <GalaxyBg>
      <Head>
        <title>Sign in - Twouitteur</title>
      </Head>
      <div className="fadeUp flex flex-col items-center justify-center space-y-6 rounded-lg bg-neutral-900/[.85] px-8 pt-8 pb-2 text-white shadow-md">
        <Image
          src="/twouitteur.svg"
          width={50}
          height={50}
          alt="twouitteur logo"
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
              .then(async (res) => {
                const token = res.data.token
                localStorage.setItem("token", token)

                api.defaults.headers["x-access-token"] = token

                const { data } = await api.get("/user/me")

                setUser(data)

                router.push("/")
              })
              .catch((err) => {
                if (err.response && err.response.data.message) {
                  setErrors({
                    username: err.response.data.message,
                    password: err.response.data.message,
                  })
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
                  name="username"
                  placeholder="Username or email"
                />
                <Input type="password" name="password" placeholder="Password" />
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
                  className="bg-twitter block h-[52px] w-52 rounded-full text-lg font-bold shadow-md transition duration-200 ease-out hover:scale-95 hover:bg-[#1a8cd8] disabled:scale-100 disabled:bg-neutral-500"
                  type="submit"
                  disabled={submitting || !dirty || !isValid}
                >
                  {submitting ? (
                    <span>
                      Sending ... <Loading color="white" small />
                    </span>
                  ) : (
                    "Sign-in"
                  )}
                </button>
                <div className="text-l">Don't have an account?</div>
                <Link href="/register">
                  <a>
                    <button className="block h-[52px] w-48 rounded-full bg-white text-lg font-bold text-black shadow-md transition duration-200 ease-out hover:scale-95 hover:bg-slate-300">
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

export async function getServerSideProps() {
  return {
    props: {
      unprotected: true,
    },
  }
}

export default Login

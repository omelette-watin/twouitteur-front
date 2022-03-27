import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import GalaxyBg from "../components/GalaxyBg"
import Loading from "../components/Loading"
import api from "../services/api"

const Login = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    api
      .post("/auth/login", { username, password })
      .then(({ data }) => {
        const token = data.user.token
        localStorage.setItem("token", token)
        window.location.pathname = "/"
      })
      .catch((err) => {
        setPassword("")
        setError(err.response.data.message || err.message)
        setSubmitting(false)
      })
  }

  return (
    <GalaxyBg>
      <div className="flex flex-col items-center justify-center space-y-10 text-white bg-neutral-900 rounded-lg px-8 py-8 shadow-md fadeUp">
        <Image
          src={"/twouitteur.svg"}
          width={50}
          height={50}
          alt={"twouitteur logo"}
        />
        <h2 className="text-3xl font-semibold">Sign-in</h2>
        <form
          className="space-y-8 divide-y divide-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-5 text-black">
            <input
              type="text"
              placeholder="Username or email"
              className="rounded-md py-1 xl:py-2 px-3 w-64 xl:w-80 font-medium text-md placeholder:font-medium"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-md py-1 xl:py-2 px-3 xl:w-80 font-medium text-md placeholder:font-medium"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            {error && (
              <p className={"text-red-600 text-center bounce"}>{error}</p>
            )}
          </div>

          <div className="space-y-3 flex flex-col items-center text-white py-8">
            <button
              className="block bg-[#1d9bf0] rounded-full w-52 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] hover:scale-95 transition duration-200 ease-out"
              type="submit"
              disabled={submitting}
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
        </form>
      </div>
    </GalaxyBg>
  )
}

export default Login

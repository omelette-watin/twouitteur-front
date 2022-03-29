import GalaxyBg from "../components/GalaxyBg"
import { useRouter } from "next/router"
import api from "../services/api"
import Image from "next/image"
import Head from "next/head"
const Logout = () => {
  const router = useRouter()
  const cancel = () => {
    router.back()
  }
  const logout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        localStorage.removeItem("token")
        delete api.defaults.headers["x-access-token"]
        window.location.pathname = "/login"
      })
      .catch(() => {
        window.location.pathname = "/login"
      })
  }

  return (
    <GalaxyBg>
      <Head>
        <title>Log out - Twouitteur</title>
      </Head>
      <div className="flex flex-col items-center justify-center text-white bg-neutral-900/[.85] rounded-lg px-8 py-8 shadow-md">
        <Image
          src={"/twouitteur.svg"}
          width={50}
          height={50}
          alt={"twouitteur logo"}
        />
        <h2 className="text-2xl font-semibold my-10">
          Log out of Twouitteur ?
        </h2>

        <button
          className="mb-5 block bg-white text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-slate-300 hover:scale-95 transition duration-200 ease-out"
          onClick={logout}
        >
          Log out
        </button>
        <button
          className="block bg-black border-[1px] border-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-neutral-900 hover:scale-95 transition duration-200 ease-out"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </GalaxyBg>
  )
}

export default Logout

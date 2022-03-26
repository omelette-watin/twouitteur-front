import Link from "next/link"
import Image from "next/image"
import GalaxyBg from "./GalaxyBg"

const ConnectionScreen = () => {
  return (
    <GalaxyBg>
      <div
        className={
          "flex flex-col items-center justify-center text-white xl:flex-row"
        }
      >
        <Image
          src={"/twouitteur-white.svg"}
          width={50}
          height={50}
          alt={"twouitteur logo"}
        />
        <div className={"text-3xl my-10 xl:mr-[80px] xl:ml-8"}>
          We were waiting for you !
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <Link href={"/login"}>
            <a>
              <button className="block bg-[#1d9bf0] rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] hover:scale-95 transition duration-200 ease-out">
                Sign-in
              </button>
            </a>
          </Link>
          <div className="text-l">Pas encore de compte ?</div>
          <Link href={"/register"}>
            <a>
              <button className="block bg-white text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-slate-300 hover:scale-95 transition duration-200 ease-out">
                Sign-up
              </button>
            </a>
          </Link>
        </div>
      </div>
    </GalaxyBg>
  )
}

export default ConnectionScreen

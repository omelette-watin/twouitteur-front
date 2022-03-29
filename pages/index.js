import Feed from "../components/Feed"
import Sidebar from "../components/Sidebar"
import Head from "next/head"
import BottomBar from "../components/BottomBar"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twouitteur</title>
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <BottomBar />
        <Feed />
        {/*  Widgets */}

        {/*  Modal*/}
      </main>
    </div>
  )
}

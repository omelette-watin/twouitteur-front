import Head from "next/head"
import Sidebar from "./Sidebar"
import BottomBar from "./BottomBar"
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} / ` : ""}Twouitteur </title>
      </Head>
      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <BottomBar />
        {children}
      </main>
    </>
  )
}

export default Layout

import Feed from "../components/Feed"
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div>
      <main className="bg-neutral-900 min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        {/*  Widgets */}

        {/*  Modal*/}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

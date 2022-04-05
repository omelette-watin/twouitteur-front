import Feed from "../components/Feed"

export default function Home() {
  return <Feed />
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  }
}

import Feed from "@/components/Feed"

const Home = () => {
  return <Feed />
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  }
}

export default Home

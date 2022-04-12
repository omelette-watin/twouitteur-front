import FeedWrapper from "@/components/FeedWrapper"

const Home = () => {
  return <FeedWrapper />
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  }
}

export default Home

import Head from "next/head"
const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - ` : ""}Twouitteur </title>
      </Head>
      {children}
    </div>
  )
}

export default Layout

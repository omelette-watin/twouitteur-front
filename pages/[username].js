import MainWrapper from "@/components/MainWrapper"
import api from "@/services/api"
import UserHeader from "@/components/UserHeader"
import UserFeed from "@/components/UserFeed"

const User = ({ user }) => {
  return (
    <MainWrapper title={user?.profilename || "Profile"}>
      {user ? (
        <>
          <UserHeader user={user} />
          <UserFeed user={user} />
        </>
      ) : (
        <div className="p-8 text-center text-gray-400">
          This account doesn't exist...
        </div>
      )}
    </MainWrapper>
  )
}

export async function getServerSideProps({ params }) {
  const { data: user } = await api
    .get(`/user/name/${params.username}`)
    .catch(() => {
      return { data: null }
    })

  return {
    props: {
      title: user ? `${user.profilename} (@${user.username})` : "Profile",
      user,
    },
  }
}

export default User

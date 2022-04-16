import MainWrapper from "@/components/MainWrapper"
import api from "@/services/api"
import UserHeader from "@/components/UserHeader"

const User = ({ user }) => {
  return (
    <MainWrapper title={user.profilename}>
      <UserHeader user={user} />
    </MainWrapper>
  )
}

export async function getServerSideProps({ params }) {
  const { data: user } = await api.get(`/user/name/${params.name}`)

  return {
    props: {
      title: `${user.profilename} (@${user.username})`,
      user,
    },
  }
}

export default User

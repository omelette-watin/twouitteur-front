import { useEditProfile } from "./EditProfileContext"
import { XIcon } from "@heroicons/react/outline"
import EditProfileForm from "@/components/EditProfileForm"

const EditProfileModal = () => {
  const { setEditModal } = useEditProfile()
  const handleCloseEditModal = () => {
    setEditModal(false)
  }

  return (
    <div className="fixed z-50 flex h-screen w-screen items-start justify-center bg-black sm:bg-black/70 sm:pt-24">
      <div className="z-10 flex w-full max-w-[100vw] flex-col rounded-xl border-white bg-black p-4 text-white shadow-neutral-800 sm:w-[600px] sm:border-[1px] sm:shadow-lg xl:w-[700px]">
        <button
          onClick={handleCloseEditModal}
          className="self-start rounded-full p-2  hover:bg-[#d9d9d9] hover:bg-opacity-10"
        >
          <XIcon color="white" height={20} width={20} />
        </button>
        <EditProfileForm />
      </div>
    </div>
  )
}

export default EditProfileModal

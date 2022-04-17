import { useEditProfile } from "./EditProfileContext"
import { XIcon } from "@heroicons/react/outline"
import EditProfileForm from "@/components/EditProfileForm"
import { useEffect } from "react"

const EditProfileModal = () => {
  const { setEditModal } = useEditProfile()
  const handleCloseEditModal = () => {
    setEditModal(false)
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex w-screen items-start justify-center overflow-y-scroll overscroll-contain bg-black pb-16 sm:bg-black/70 sm:pt-24">
      <div className="z-10 flex w-full max-w-[100vw] flex-col border-white bg-black p-4 text-white shadow-neutral-800 sm:min-h-fit sm:w-[600px] sm:rounded-xl sm:border-[1px] sm:shadow-lg xl:w-[700px]">
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

import privacy0 from "../../public/privacy/privacy-world.svg"
import privacy1 from "../../public/privacy/privacy-following.svg"
import privacy2 from "../../public/privacy/privacy-mentionned.svg"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useSelector, Input } from "usetheform"

const labels = {
  0: "Everyone",
  1: "People you follow",
  2: "Only people you mention",
}
export const PrivacyPicker = () => {
  const [visible, setVisibility] = useState(false)
  const [postPrivacy] = useSelector((state) => state.postPrivacy)
  const label = labels[postPrivacy] || labels[0]
  const bntLabel = `${label} can reply`
  const toggle = (e) => {
    e.stopPropagation()
    setVisibility((prev) => !prev)
  }
  const refPicker = useClickOutPicker(() => {
    visible && setVisibility(false)
  })

  useEffect(() => {
    if (postPrivacy !== undefined) {
      setVisibility(false)
    }
  }, [postPrivacy])

  return (
    <div className={"relative"}>
      <button
        type="button"
        className="space-x-2 flex items-center text-[#1d9bf0] text-sm hover:bg-[#1d9bf0]/10 rounded-full py-1 pl-2 pr-3"
        onClick={toggle}
      >
        <Image alt={bntLabel} src={privacy0} className={"h-8 w-8"} />
        <span>{bntLabel}</span>
      </button>
      <div
        ref={refPicker}
        data-visible={visible}
        className={`absolute z-10 bg-black border-[1px] border-gray-700 rounded py-3 px-3 shadow-md ${
          visible ? "block" : "hidden"
        }`}
      >
        <div className="py-0 px-2 font-bold">Who can reply?</div>
        <div className="py-0 px-2">
          Choose who can reply to this Tweet. Anyone mentioned can always reply.
        </div>
        <div className="space-y-2 mt-3">
          <RadioWithLabel img={privacy0} id="everyone" value="0" checked>
            {labels[0]}
          </RadioWithLabel>
          <RadioWithLabel img={privacy1} id="onlyfollower" value="1">
            {labels[1]}
          </RadioWithLabel>
          <RadioWithLabel img={privacy2} id="onlymentioned" value="2">
            {labels[2]}
          </RadioWithLabel>
        </div>
        {/*ll*/}
      </div>
    </div>
  )
}

const useClickOutPicker = (cb) => {
  const ref = useRef(null)
  useEffect(() => {
    const clickOut = (e) => {
      if (!ref.current.contains(e.target)) {
        cb(e)
      }
    }
    window.addEventListener("click", clickOut)

    return () => {
      window.removeEventListener("click", clickOut)
    }
  }, [cb])

  return ref
}

function RadioWithLabel({
  id,
  img,
  name = "postPrivacy",
  children,
  value,
  checked,
}) {
  return (
    <div className="flex items-center">
      <Input
        type="radio"
        className={"hidden"}
        id={id}
        name={name}
        value={value}
        checked={checked}
      />
      <label
        className="flex items-center pl-2 pr-3 py-1 rounded-full space-x-2 cursor-pointer relative hover:bg-[#1d9bf0]/10"
        htmlFor={id}
      >
        <Image alt="privacy" src={img} />
        <span>{children}</span>
      </label>
    </div>
  )
}
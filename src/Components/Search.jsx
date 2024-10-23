import { useContext, useRef, useState } from "react"
import { WalletContext } from "../Provider/Wrap"
import { Desc } from "./Desc"

const Search = () => {

  const inputRef = useRef(null)

  const [check, setcheck] = useState(true)

  const { setStage } = useContext(WalletContext)

  function submitPass(e) {

    if (e.key === 'Enter') {
      if (inputRef.current.value === '100xdev') {
        setcheck(true)
        setStage(1)
      }
      else {
        setcheck(false)
      }
    }

  }

  return (
    <>

      <div className="f gap-4 bg relative " >
        <div className="circle"><img src="/finger.svg" alt="guri" /></div>
        <input onKeyDown={submitPass} type="text" ref={inputRef} placeholder='Enter Password to Unlock' />
        <Desc title="Enter 100xdev here and press Enter " p="-right-[18rem] top-[3rem] " />
      </div>
      <p className={`text-red-600 mt-5 ${check ? 'opacity-0' : 'opacity-50'} `} > In Developemnt Enter 100xdev  </p>
    </>
  )
}

export default Search
import { useContext, useRef, useState } from "react"
import { WalletContext } from "../Provider/Wrap"
import { Desc } from "./Desc"

const ImportPhrase = () => {

    const { setStage, setmnemonic } = useContext(WalletContext)

    const inputRef = useRef(null)

    const [check, setcheck] = useState(true)


    function submitPass(e) {

        if (e.key === 'Enter') {
            setcheck(true)
            setmnemonic(inputRef.current.value)
            setStage(4)
        }

    }

    return (
        <>
            <div className="f gap-4 bg3 rounded-3xl p-4 relative " >
                <div className="circle"><img src="/finger.svg" alt="guri" /></div>
                <textarea rows={2} className="text-center " onKeyDown={submitPass} type="text" ref={inputRef} placeholder='Enter You 12 word mnemonic to import wallet' />
                <Desc title="Enter 100xdev here and press Enter " p="-right-[18rem] top-[3rem] " />
            </div>

            <p className={`text-red-600 mt-5 ${check ? 'opacity-0' : 'opacity-50'} `} > Wrong Pass Try again man </p>
        </>
    )
}

export default ImportPhrase
import { useContext } from 'react'
import { WalletContext } from '../Provider/Wrap'

function Desc({ title, p }) {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }

    return (
        <div className={`absolute hidden md:block opacity-45 ${p} `} >
            <img src="/Line.svg" alt="" width={50} />
            <p className="opacity-100 mt-2 pl-9" >{title} </p>
        </div>
    )
}

function Desc2({ title, p }) {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }
    return (
        <div className={`absolute hidden md:block opacity-45 bottom-9 ${p} `} >
            <p className="opacity-100 my-2 pl-9" >{title} </p>
            <img src="/Line.svg" alt="" width={50} className="rotate-180 scale-x-[-1]" />
        </div>
    )
}
function Desc3({ title, p }) {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }
    return (
        <div className={`absolute hidden opacity-45 bottom-9 md:flex flex-col items-end ${p} `} >
            <p className="opacity-100 my-2 pl-9" >{title} </p>
            <img src="/Line.svg" alt="" width={50} className="rotate-180 " />
        </div>
    )
}
function Desc4({ title, p }) {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }
    return (
        <div className={`absolute hidden opacity-45 bottom-9 md:flex flex-col items-end ${p} `} >
            <img src="/Line.svg" alt="" width={50} className="scale-x-[-1] " />
            <p className="opacity-100 my-2 pl-9" >{title} </p>
        </div>
    )
}
function Desc5({ title, p }) {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }
    return (
        <div className={`absolute opacity-45 bottom-9  ${p} `} >
            <p className="opacity-100 my-2 pl-12" >{title} </p>
            <img src="/Line.svg" alt="" width={50} className="scale-y-[-1] scale-x-[-1] rotate-90 " />
        </div>
    )
}

export {
    Desc, Desc2,
    Desc3, Desc4, Desc5
}
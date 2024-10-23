import { createContext, useState } from 'react'

let WalletContext = createContext()

// eslint-disable-next-line react/prop-types
const Wrap = ({ children }) => {


    const [stage, setStage] = useState(2)
    const [dPath, setDpath] = useState("no paths")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexEth, setCurrentIndexEth] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [mnemonic, setmnemonic] = useState("")
    const [help, SetHelp] = useState(true)
    const [walletType, setWalletType] = useState("sol")


    return (
        <WalletContext.Provider value={{ stage, setStage, dPath, setDpath, currentIndex, setCurrentIndex, publicKeys, setPublicKeys, addresses, setAddresses, mnemonic, setmnemonic, help, SetHelp, walletType, setWalletType, currentIndexEth, setCurrentIndexEth }} >
            {children}
        </WalletContext.Provider>
    )
}

export { Wrap, WalletContext }
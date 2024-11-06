import { createContext, useState } from 'react'


import { ConnectionProvider } from '@solana/wallet-adapter-react';


let WalletContext = createContext()

// eslint-disable-next-line react/prop-types
const Wrap = ({ children }) => {

    const [stage, setStage] = useState(2)
    const [dPath, setDpath] = useState("no paths")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexEth, setCurrentIndexEth] = useState(0);
    const [publicKeys, setPublicKeys] = useState([{}]);
    const [addresses, setAddresses] = useState([]);
    const [mnemonic, setmnemonic] = useState("guri")
    const [help, SetHelp] = useState(true)
    const [walletType, setWalletType] = useState("sol")

    const [logged, setLogged] = useState(false)

    const [clusterMain, setClusterMain] = useState(false)


    return (
        <ConnectionProvider endpoint={clusterMain ? import.meta.env.VITE_RPC_SOL_URL_MAIN : import.meta.env.VITE_RPC_SOL_URL_DEV} >
            <WalletContext.Provider value={{ stage, setStage, clusterMain, setClusterMain, dPath, setDpath, currentIndex, logged, setLogged, setCurrentIndex, publicKeys, setPublicKeys, addresses, setAddresses, mnemonic, setmnemonic, help, SetHelp, walletType, setWalletType, currentIndexEth, setCurrentIndexEth }} >
                {children}
            </WalletContext.Provider>
        </ConnectionProvider>
    )
}

export { Wrap, WalletContext }
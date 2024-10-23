/* eslint-disable no-unused-vars */
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { useState } from "react"
import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"
import { Desc, Desc3 } from "./Desc"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import nacl from "tweetnacl"

const Phrase = () => {

    const { setStage, dPath, currentIndex, setCurrentIndex, setPublicKeys, addresses, setAddresses, mnemonic, setmnemonic, currentIndexEth, setCurrentIndexEth, walletType, setWalletType } = useContext(WalletContext)

    const [loading, setLoading] = useState(false)

    function copyToClipBoard() {
        navigator.clipboard.writeText(mnemonic);
    }

    function newMnemonic() {
        setmnemonic(generateMnemonic())
    }

    function nextStage() {

        console.log(currentIndex, currentIndexEth)
        if (walletType === 'sol') {
            const seed = mnemonicToSeedSync(mnemonic)
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const dSeed = derivePath(path, seed.toString("hex")).key;

            const secret = nacl.sign.keyPair.fromSeed(dSeed).secretKey;

            const keypair = Keypair.fromSecretKey(secret);
            console.log("Keypair", keypair.publicKey.toBase58())

            setPublicKeys([keypair.publicKey]);
            console.log(keypair.publicKey.toBase58())
            setCurrentIndex(x => x + 1);
            setStage(5)
        }
        if (walletType === 'eth') {

            const seed = mnemonicToSeedSync(mnemonic)
            const path = `m/44'/60'/${currentIndexEth}'/0'`;

            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(path);

            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);

            setAddresses([wallet.address]);
            console.log("eth", wallet.address)
            setCurrentIndexEth(x => x + 1);
            setStage(5)
        }

    }
    if (!mnemonic) {

        setmnemonic(generateMnemonic())

    }

    return (
        <>

            <div className='bg2 w-[480px]  relative  ' >
                <div className="top fb m-4 ">
                    <div className="left f gap-3  ">
                        <button onClick={copyToClipBoard} className="circle2 p-4 "><img src="/cpy.svg" alt="" srcSet="" /></button>
                        <div className="text">
                            <h5>Latest Mnemonic Phrase</h5>
                            <p>Click Anywhere to copy</p>
                        </div>
                    </div>
                    <button onClick={newMnemonic} className=" bg-black p-4 rounded-full ">
                        <img src="/repeat.svg" alt="" />
                    </button>
                </div>
                <div className=" f mt-10 flex-wrap cursor-pointer  " onClick={copyToClipBoard} >
                    {mnemonic.split(" ").map((item, index) => (
                        <button key={index} className='word' >{item}</button>
                    ))}
                </div>
                <Desc title="Create New Random mnemonic here " p="-right-[18rem] top-[3rem] " />
                <Desc3 title="Click Any wher to copy to Clipboard " p="-left-[18rem] top-[9rem] " />


            </div>
            <div className='f gap-3 mt-10 -mb-16 ' >
                <button onClick={nextStage} className='f bg-[#E1FF01]  rounded-full p-2 gap-4 pl-4' >
                    <h3>Next</h3>

                    {!loading && <div className=" bg-white rounded-full p-3 text-white "> <img src="/arrow.svg" /></div>}
                    {loading && <div className=" bg-black animate-spin rounded-full p-3 text-white "> <img src="/repeat.svg" /></div>}

                </button >
            </div >
        </>
    )
}

export default Phrase
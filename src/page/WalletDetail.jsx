/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import Title from '../Components/Title'
import PrevPage from '../Components/PrevPage'
import { Desc2, Desc3, Desc4 } from '../Components/Desc'
import { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { WalletContext } from '../Provider/Wrap'
import axios from 'axios'

import { useConnection } from "@solana/wallet-adapter-react";

import {
    Connection,
    Keypair,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";


const WalletDetail = () => {

    const [error, setError] = useState(null); // Error state
    const { help, SetHelp } = useContext(WalletContext)


    let [searchParams] = useSearchParams();
    const WalletType = searchParams.get("WalletType")
    const index = searchParams.get("index")


    function toggleHelp() {
        SetHelp(!help)
    }

    return (
        <main className='fc relative'>
            <button onClick={toggleHelp} className='help hidden sm:flex  ' >?  <Desc3 title="Loooking annoying Toggle Off here" p="-top-[3rem] -left-[18rem] " /> </button>
            <PrevPage />
            <br /><br />
            <Title text1={WalletType === 'sol' ? `Solana Account ${index}` : `Etherium Account ${index}`} text3="Your Account is only stored on you browser" />
            <br /><br />
            {WalletType === 'sol' && <CardSOL setError={setError} />}
            {WalletType === 'eth' && <CardETH setError={setError} />}

            <br />
            <Copy error={error} />
        </main>
    )
}


function CardSOL({ setError }) {
    const { clusterMain, setClusterMain, publicKeys } = useContext(WalletContext)
    function toggleCluster() {
        setClusterMain(x => !x)
    }

    let { id } = useParams()

    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);


    const { connection } = useConnection()



    useEffect(() => {

        setLoading(true)

        const fetchData = async () => {

            try {
                const response = await connection.getBalance(new PublicKey(id))
                setBalance(response / LAMPORTS_PER_SOL);  // Store the balance in state
            } catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setLoading(false);  // Set loading to false after request is done
            }
        };

        fetchData();
    }, [id, clusterMain]);



    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const [toggleUI, setToggleUI] = useState(false)

    const toRef = useRef(null)
    const amtRef = useRef(null)



    async function sendSOL() {
        if (!toggleUI) {
            setToggleUI(true)
            return
        }

        let secret = publicKeys.find((item) => item.pubKey == id)
        console.log(secret)
        const fromKeypair = Keypair.fromSecretKey((Uint8Array.from((Object.values(secret.pvtKey)))))

        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(id),
                toPubkey: new PublicKey(toRef.current.value),
                lamports: Number(amtRef.current.value * LAMPORTS_PER_SOL),
            }),);

        const connection = new Connection(
            "https://api.devnet.solana.com",
            "confirmed",
        );

        try {
            setLoading(true)
            const sign = await sendAndConfirmTransaction(connection, transferTransaction, [
                fromKeypair,
            ]);
            console.log("signature : ", sign)
            setError("transaction success check console for signature")

        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
            setError("transaction success check console for signature")
        }

    }

    async function airdrop() {
        setLoading(true);
        setError(null);

        let data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "requestAirdrop",
            "params": [
                id,
                500000000
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            // url: 'https://api.devnet.solana.com',
            url: import.meta.env.RPC_SOL_URL_DEV,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            await delay(1000);
            await axios.request(config)
            await delay(1000);
            setError('Airdrop Sucess . Please Refresh it may take some time to refetch .');
        }
        catch (e) {
            console.error('Airdrop failed:', e);
            setError('Airdrop failed. Too Many Requests .');
        } finally {
            setLoading(false); // End loading
        }


    }

    return (

        <div className=' w-[360px] relative  '>

            <div className="bg3 mb-2  relative z-40 rounded-[30px] p-4  ">

                <div className="second my-3 ">
                    <div className="flex items-center gap-2 ">
                        <p className="text-black opacity-100 cursor-pointer " onClick={toggleCluster} > {clusterMain ? "MainNet" : " DevNet"} </p>
                        <Desc4 title="Change Cluster" p="-left-[10rem] top-8 " />
                        <p className="size-1.5 bg-black rounded-full "></p>
                        <p>Total Balance</p>
                    </div>
                </div>
                <div className="third  mb-8 gap-2 flex items-end ">
                    <h1 className="third hel font-semibold truncate  ">
                        $ {loading ? "...." : (balance * 165.08).toLocaleString('us')}
                    </h1>
                    <p className="pb-1  " >
                        {loading ? "Loading.." : (balance).toLocaleString('us')}
                        <br />
                        SOL
                    </p>
                </div>
                <div className="flex justify-between gap-1 relative ">
                    <button className='btn n' onClick={sendSOL}  >Send</button>
                    <button className='btn' onClick={() => setToggleUI(false)}  >Receive</button>
                    <button onClick={airdrop}>
                        {!loading ? <img className="btn-img" src="/airdrop.svg" alt="" /> : <img className='animate-spin  btn-img2 ' src="/repeat.svg" alt="" />}

                    </button>
                    <Desc2 title="Airdop Yourself Some Money" p="-right-[16rem]" />
                </div>

            </div>
            {
                toggleUI &&
                <motion.div className="flex gap-1 absolute -bottom-7 overflow-hidden z-0 pt-16 pb-2 px-3 bg-black rounded-3xl justify-between"
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3 }}>
                    <input type="text" ref={toRef} className=' bg-black text-white ' placeholder='Receiver Address ' />
                    <input type="text" ref={amtRef} className=' bg-black text-white w-1/2' placeholder='0.01' value={0.01} />
                    <div className=" text-white px-3 rounded-full" >SOL</div>
                </motion.div>
            }

        </div>
    )

}
function CardETH() {

    const [loading] = useState(true);


    return (
        <div className="bg3 mb-2 relative rounded-[30px] p-4 w-[350px]  ">

            <div className="second my-3 ">
                <div className="flex items-center gap-2 ">
                    <p className="text-black opacity-100" >DevNet </p>
                    <p className="size-1.5 bg-black rounded-full "></p>
                    <p>Total Balance</p>
                </div>
            </div>
            <div className="third  mb-8 gap-2 flex items-end ">
                <h1 className="third hel font-semibold ">
                    $ {loading && "...."}
                </h1>
                <p className="pb-1" >
                    {loading && "Feature Not Availble"}
                </p>
            </div>
            <div className="flex justify-between gap-1 relative ">
                <button className='btn n' >Send</button>
                <button className='btn' >Receive</button>
                <button >
                    {!loading ? <img className="btn-img" src="/airdrop.svg" alt="" /> : <img className='animate-spin  btn-img2 ' src="/repeat.svg" alt="" />}

                </button>
                <Desc2 title="Sorry Not Avaible Try agian later" p="-right-[17.5rem]" />
            </div>

        </div>
    )

}

function Copy({ error }) {

    let { id } = useParams()


    function copyToClipBoard() {
        navigator.clipboard.writeText(id);
    }

    return (
        <>

            <div className="f bg mt-3 relative w-[350px] " >
                <button onClick={copyToClipBoard} className="circle3 px-4 py-3.5 bg-black"><img className='invert' width={20} src="/cpy.svg" alt="guri" /></button>
                <p className=' break-all mx-4 ' >
                    {id}
                </p>
                <Desc3 title="Copy You wallet Public Adderss  here  " p="-left-[18.5rem] -top-[3rem] " />
            </div>

            <p className='mt-4' > {error}</p>
        </>
    )
}


export default WalletDetail



// let data = JSON.stringify({
//     "jsonrpc": "2.0",
//     "id": 1,
//     "method": "getBalance",
//     "params": [
//         id
//     ]
// });

// let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: import.meta.env.VITE_RPC_SOL_URL_DEV,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     data: data
// };
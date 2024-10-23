/* eslint-disable react/prop-types */
import Title from '../Components/Title'
import PrevPage from '../Components/PrevPage'
import { Desc2, Desc3 } from '../Components/Desc'
import { useState, useEffect, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { WalletContext } from '../Provider/Wrap'
import axios from 'axios'

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
            <button onClick={toggleHelp} className='help  ' >?  <Desc3 title="Loooking annoying Toggle Off here" p="-top-[3rem] -left-[18rem] " /> </button>
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

    let { id } = useParams()

    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [
                    id
                ]
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.devnet.solana.com',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };

            try {
                const response = await axios.request(config);
                console.log(response.data.result.value)
                setBalance(response.data.result.value / 1000000000);  // Store the balance in state
            } catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setLoading(false);  // Set loading to false after request is done
            }
        };

        fetchData();
    }, [id]);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
            url: 'https://api.devnet.solana.com',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            await delay(1000);
            let res = await axios.request(config)
            await delay(2000);
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
                    $ {loading ? "...." : (balance * 165.08).toLocaleString('us')}
                </h1>
                <p className="pb-1" >
                    {loading ? "Loading.." : (balance).toLocaleString('us')} Sol
                </p>
            </div>
            <div className="flex justify-between gap-1 relative ">
                <button className='btn n' >Send</button>
                <button className='btn' >Receive</button>
                <button onClick={airdrop}>
                    {!loading ? <img className="btn-img" src="/airdrop.svg" alt="" /> : <img className='animate-spin  btn-img2 ' src="/repeat.svg" alt="" />}

                </button>
                <Desc2 title="Airdop Yourself Some Money" p="-right-[16rem]" />
            </div>

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

            <div className="f bg relative w-[350px] " >
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
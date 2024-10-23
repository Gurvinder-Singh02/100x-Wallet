import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"
import { Desc } from "./Desc";


const Network = () => {

  const { setDpath, setStage, currentIndex, setWalletType } = useContext(WalletContext)


  // function setBtcPath() {
  //   setDpath(`m/44/501/${currentIndex}/0`)
  //   setWalletType('btc')
  //   setStage(3)
  // }
  function setEthPath() {
    setDpath(`m/44/60/${currentIndex}/0`)
    setWalletType('eth')
    setStage(3)
  }
  function setSolPath() {
    setDpath(`m/44/501/${currentIndex}/0`)
    setWalletType('sol')
    setStage(3)
  }

  return (
    <>
      <div className='bg2 w-[400px] flex flex-col justify-between  '   >
        <div className="top my-4 flex justify-center items-center gap-4">

          <h2>Wallets You can Have</h2>

        </div>
        <div className="flex  bg2 relative flex-col gap-4 ">
          <button onClick={setSolPath} >
            <Card name="Solana" amount={125.35} img="/sol.svg" />
          </button>
          <button onClick={setSolPath} >
            <Card name="Bitcoin" amount={67759.35} img="/btv.svg" />
          </button>
          <button onClick={setEthPath} >
            <Card name="Etherium" amount={2677.45} img="/eth.svg" />
          </button>
          <Desc title="Select the Wallet Type Here  " p="-right-[16rem] top-[3rem] " />
        </div>
      </div>

    </>
  )
}

// eslint-disable-next-line react/prop-types
function Card({ name, amount, img }) {
  return (
    <>
      <div className="card flex bg2 rounded-full justify-between">
        <div className="left f gap-2 ">
          <div className="circle"><img src={img} alt="" /></div>
          <h4>{name}</h4>
        </div>
        <div className="right f gap-4">
          <h4>${amount}</h4>
          <div className="circle"><img src="/arr.svg" alt="" /></div>
        </div>
      </div>

    </>
  )
}

export default Network


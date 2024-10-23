import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"
import { Desc, Desc3 } from "./Desc"

const Wallet1 = () => {
  const { setStage } = useContext(WalletContext)

  function goToImport() {
    setStage(6)
  }

  return (
    <>
      <button onClick={goToImport} className='f cursor-pointer  bg gap-4 '>
        <div className="flex flex-col ml-4" >
          <h2>Import Exisitng Wallet </h2>
        </div>
        <div className="circle h-14 f w-14 -rotate-45 ">
          <img src="/arrow.svg" width={30} alt="" />
        </div>
      </button>

    </>
  )
}
const Wallet2 = () => {


  const { setStage } = useContext(WalletContext)

  function goToCreate() {
    setStage(2)
  }
  return (
    <>
      <button onClick={goToCreate} className='f cursor-pointer rounded-full p-2 bg-black text-white gap-4 '>
        <div className="circle h-14 f w-14 -rotate-45 ">
          <img src="/arrow.svg" width={30} alt="" />
        </div>
        <div className="flex flex-col mr-4" >
          <h2>Generate New Wallet </h2>
        </div>

      </button>

    </>
  )
}


const Wallet = () => {
  return (
    <div className="relative">
      <Wallet1 />
      <Desc3 title="do you Have a Mnemonic Phrase  ?" p="-left-[18rem] -top-[2rem] " />
      <br />
      <Wallet2 />
      <Desc title="No Issues we can Create New One " p="-right-[18rem] top-[8rem] " />
    </div>
  )
}


export default Wallet
import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"

const Next = ({ goto }) => {

  const { setStage } = useContext(WalletContext)


  function nextStage() {
    if (goto) {
      setStage(goto)
    }
    else {

      setStage(x => x + 1)
    }
  }

  return (
    <div className='f gap-3 mt-10 ' >
      <button onClick={nextStage} className='f bg-[#E1FF01]  rounded-full p-2 gap-4 pl-4' >

        <h3>Next</h3>
        <div className=" bg-white rounded-full p-3 text-white ">
          <img src="/arrow.svg" className='fill-white' />
        </div>
      </button>
    </div>
  )
}



export default Next
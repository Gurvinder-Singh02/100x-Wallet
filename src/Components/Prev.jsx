
import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"

const Prev = () => {

  const { stage, setStage } = useContext(WalletContext)

  function prevStage() {

    if (stage == 0) {
      return
    }
    if (stage == 6) {
      setStage(3)
    }

    setStage(x => x - 1)
  }

  return (
    <button onClick={prevStage} className='f bg-n  rounded-full p-3  ' >
      <img className="-rotate-90 mr-2  -ml-2 " src="/back.svg" />
    </button>
  )
}


export default Prev
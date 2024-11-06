
import { useContext } from "react"
import { WalletContext } from "../Provider/Wrap"

const Prev = () => {

  const { stage, logged, setStage } = useContext(WalletContext)

  function prevStage() {

    console.log(stage)

    if (logged) {
      setStage(5)
      return
    }

    if (stage == 0) {
      return
    }
    if (stage == 6) {
      setStage(3)
    }
    else {
      setStage(x => x - 1)
    }
  }

  return (
    <button onClick={prevStage} className='f bg-n  rounded-full p-3  ' >
      <img className="-rotate-90 mr-2  -ml-2 " src="/back.svg" />
    </button>
  )
}


export default Prev
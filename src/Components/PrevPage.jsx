
import { useNavigate } from "react-router-dom"

const PrevPage = () => {
    const naviagate = useNavigate()

    function goBack() {
        naviagate('/')
    }

    return (
        <button onClick={goBack} className='f bg-n  rounded-full p-3 px-5 gap-4 ' >
            <img className="-rotate-90" src="/back.svg" />
            Go Back
        </button>
    )
}



export default PrevPage
import { useContext } from 'react'

import { WalletContext } from '../Provider/Wrap'
import Prev from './Prev'


const Badge = () => {
    const { stage } = useContext(WalletContext)
    return (
        <>
            {stage != 5 &&
                <div className="div bg-n f rounded-full px-6 mb-5 py-2">
                    <Prev /> Step : {stage !== 6 ? stage : 3}
                </div>
            }
        </>
    )
}

export default Badge
import { useContext } from 'react'
import { WalletContext } from '../Provider/Wrap'

function Footer() {

    const { help } = useContext(WalletContext)

    if (!help) {
        return null
    }

    return (
        <footer className="fixed  bottom-0  left-1/2 -translate-x-1/2 hidden sm:f">
            <div className='f p gap-2 opacity-45' >&copy; made by <a href="https://gxuri.in" target="_blank">
                gxuri</a >
                <p className='hidden md:block opacity-100 ' >- A minimal project of Cohort 3.0</p>
                <a href="https://github.com/Gurvinder-Singh02" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" width="14px" />
                </a>
            </div>

        </footer>
    )
}

export default Footer
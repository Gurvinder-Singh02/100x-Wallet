import Next from './Next'

const Agree = () => {
    return (
        <>
            <div className='f' >
                <input type="checkbox" className='custom-checkbox' name="check" id="check" />
                <label htmlFor="check" >I understand that I am responsible for saving my secret recovery <br />
                    phrase, and that it is the only way to recover my wallet.</label>
            </div>
            <Next />
        </>
    )
}

export default Agree
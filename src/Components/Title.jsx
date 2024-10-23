/* eslint-disable react/prop-types */

const Title = ({ text1, text2, text3 }) => {
  return (
    <div className='fc' >
      <h1>{text1}</h1>
      <h1>{text2}</h1>
      <p>{text3}</p>
    </div>
  )
}

export default Title
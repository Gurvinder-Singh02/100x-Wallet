import { useContext, useEffect } from 'react'
import Search from './Components/Search'
import Title from './Components/Title'
import Wallet from './Components/Wallet'
import Network from './Components/Network'
import Agree from './Components/Agree'
import Phrase from './Components/Phrase'
import { useCookies } from 'react-cookie'

import { WalletContext } from './Provider/Wrap'
import ImportPhrase from './Components/ImportPhrase'
import { Desc, Desc2, Desc3 } from './Components/Desc'
import Badge from './Components/Badge'
import MainUI from './page/MainUI'
import Footer from './Components/footer'

function App() {

  const { stage, setStage, currentIndex, setCurrentIndex, publicKeys, setLogged, setPublicKeys, addresses, setAddresses, help, SetHelp, currentIndexEth, setCurrentIndexEth } = useContext(WalletContext)

  const [cookies, setCookie] = useCookies(['user'])

  useEffect(function () {

    setStage(cookies.stage || 0)
    setPublicKeys(cookies.public || [])
    setAddresses(cookies.addresses || [])

    setCurrentIndex(cookies.currentIndex || 0)
    setCurrentIndexEth(cookies.currentIndexEth || 0)





  }, [cookies.addresses, cookies.currentIndex, cookies.currentIndexEth, cookies.public, cookies.stage, setAddresses, setCurrentIndex, setCurrentIndexEth, setPublicKeys, setStage])

  useEffect(function () {

    setCookie('stage', stage)

    setCookie('public', publicKeys)
    setCookie('addresses', addresses)

    setCookie('currentIndex', currentIndex)
    setCookie('currentIndexEth', currentIndexEth)

    console.log("x", stage)
    if (currentIndex) {
      setLogged(true)
    }


  }, [addresses, currentIndex, currentIndexEth, publicKeys, setCookie, stage])

  function toggleHelp() {
    SetHelp(!help)
  }
  function toggleHome() {
    setStage(5)

  }
  function toggleDelete() {
    setStage(0)
    setPublicKeys([])
    setAddresses([])
    setCurrentIndex(0)
    setCurrentIndexEth(0)
    setStage(0)
    setLogged(false)
  }

  console.log("mian")



  return (

    <main className='fc relative' >
      <Badge />
      <button onClick={toggleHelp} className='help hidden md:flex    ' >  <span className='' >?</span> <Desc3 title="Loooking annoying Toggle Off here" p="-top-[3rem] -left-[18rem] " /> </button>
      <button onClick={toggleHome} className='help3 hidden md:flex ' > <img src="/home.svg" alt="" srcSet="" width={20} className='' /> </button> <Desc title="Skip All and go Home " p="top-[7rem] left-[7rem] " />
      <button onClick={toggleDelete} className='help2 hidden md:flex ' >X <Desc2 title="Start Fresh" p="-top-[4rem] -right-[8rem] " /> </button>
      {stage == 0 && <Title text1="Welcome to The Secure AF " text2="100x Wallet" />}
      {stage == 1 && <Title text1="A Promise Of Security And Transparency  " text2="For Everyone" />}
      {stage == 2 && <Title text1="Select You Network " text3="Selec the Preffered Netwrok you need" />}
      {stage == 3 && <Title text1="Secret Recovery Phrase Warning !!!" text3="This is the ONLY way to recover your account if you lose access to your device or password." />}
      {stage == 4 && <Title text1="Secret Recovery Phrase   " text3="Save these words in a safe place." />}
      {stage == 6 && <Title text1="Enter Your Phrase   " text3="We Promise we never store your phrase" />}

      <br /><br /><br /><br />
      {stage == 0 && <Search />}
      {stage == 1 && <Wallet />}
      {stage == 2 && <Network />}
      {stage == 3 && <Agree />}
      {stage == 6 && <ImportPhrase />}
      {stage == 4 && <Phrase />}
      {stage == 5 && <MainUI />}

      <Footer />
    </main>
  )
}

export default App

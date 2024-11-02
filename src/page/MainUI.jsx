/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import { Desc, Desc2, Desc3 } from "../Components/Desc"
import { WalletContext } from "../Provider/Wrap"
import { Keypair } from "@solana/web3.js";
import { PublicKey } from '@solana/web3.js';
import { Wallet, HDNodeWallet } from "ethers";

import { mnemonicToSeedSync } from "bip39"
import { useContext } from "react"
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"


const MainUI = () => {

  // eslint-disable-next-line no-unused-vars
  const { stage, publicKeys, addresses, mnemonic, walletType } = useContext(WalletContext)

  // console.log("Stage", stage, "mnemonic", mnemonic)

  return (
    <div>
      <TopCard />
      <div className="bg3 mb-2 relative rounded-[30px] p-4 w-[350px]  ">
        <Headline />
        <div className="flex flex-col gap-2 h-[280px] overflow-x-visible overflow-y-scroll   ">

          {walletType === 'sol' && publicKeys.map((item, index) => {
            const publicKey = new PublicKey(item);
            return (
              <Card key={index} name={"Solana " + (index + 1)} type="sol" index={index + 1} amount={publicKey.toBase58()} img="/sol.svg" />
            )
          })}

          {walletType === 'eth' && addresses.map((item, index) => {
            return (
              <Card key={item} name={"Etherium " + (index + 1)} type="eth" index={index + 1} amount={item} img="/eth.svg" />
            )
          })}
          <Desc2 title="Click To Enter Wallet Details " p=" top-[8rem] -right-[15rem]" />
        </div>
      </div>
      <div className="w-[350px]  relative  badge flex gap-4 ">
        <Desc3 title="Select Wallet Type here" p="-left-[13rem]" />
        <ToggleWallet />
      </div>
    </div>
  )

}

const TopCard = () => {

  const { setStage, currentIndex, setCurrentIndex, addresses, setAddresses, currentIndexEth, setCurrentIndexEth, publicKeys, setPublicKeys, mnemonic, walletType } = useContext(WalletContext)

  function addWallet() {

    if (walletType === 'sol') {
      // console.log("walletType is 'sol'");

      // Log the mnemonic
      // console.log("mnemonic", mnemonic);

      // Convert the mnemonic to a seed
      const seed = mnemonicToSeedSync(mnemonic);
      // console.log("Generated seed from mnemonic:", seed.toString("hex"));

      // Derive the path for the key
      const path = `m/44'/501'/${currentIndex}'/0'`;
      // console.log("Derivation path:", path);

      // Derive the seed using the specified path
      const dSeed = derivePath(path, seed.toString("hex")).key;
      // console.log("Derived seed for path:", dSeed.toString("hex"));

      // Generate secret key from the derived seed
      const secret = nacl.sign.keyPair.fromSeed(dSeed).secretKey;
      // console.log("Generated secret key:", secret);

      // Generate keypair from the secret key
      const keypair = Keypair.fromSecretKey(secret);
      // console.log("Generated keypair:", keypair);

      // Log the private key
      // console.log("Private Key (secretKey):", keypair.secretKey);

      // Log the public key in base58 format
      // console.log("Public Key (base58):", keypair.publicKey.toBase58());

      // Update public keys array with the new public key
      setPublicKeys([...publicKeys, keypair.publicKey]);

      // Log the public key after the update
      // console.log("Public key after set:", keypair.publicKey.toBase58());

      // Increment the current index
      setCurrentIndex(x => x + 1);
      // console.log("Incremented current index:", currentIndex + 1);

      // Set stage to 5
      setStage(5);
      // console.log("Stage set to 5");
    }
    if (walletType === 'eth') {

      const seed = mnemonicToSeedSync(mnemonic)
      const path = `m/44'/60'/${currentIndexEth}'/0'`;

      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);

      const privateKey = child.privateKey;
      // console.log(privateKey)
      const wallet = new Wallet(privateKey);

      setAddresses([...addresses, wallet.address]);
      // console.log("eth", wallet.address)
      setCurrentIndexEth(x => x + 1);
      setStage(5)
    }
  }

  function addMoney() {
    alert("1 SOl WIll be added from dev net")
  }

  function gotoMnemonic() {
    setStage(4)
  }

  return (
    <div className="bg3 mb-2 relative rounded-[30px] p-4 w-[350px]  ">
      <div className="top mb-8 flex justify-between ">
        <div className="flex gap-2 " >
          <img src="/avatar.png" alt="" width={54} />
          <div className="text">
            <h5>Hey, Gxuri</h5>
            <p>Welcome Back</p>
          </div>
        </div>
        <button onClick={gotoMnemonic} className="border p-4 relative rounded-full">
          <img src="settings.svg" alt="" />
          <Desc title="Change Your Mnemonic here" p="-right-[16rem]" />
        </button>
      </div>
      <div className="second mb-1 ">
        <div className="flex items-center gap-2 ">
          <p className="text-black opacity-100" >All Accounts </p>
          <p className="size-1.5 bg-black rounded-full "></p>
          <p>{publicKeys.length} Sol {addresses.length} Eth </p>
        </div>
      </div>
      <div className="third  mb-8 gap-2 flex items-end ">
        <h1 className="third hel font-semibold ">
          DevNet
        </h1>
        <p className="pb-1" > X RPC Server </p>
      </div>
      <div className=" flex justify-between gap-1 relative ">
        <button className='btn n' >Send</button>
        <button className='btn' onClick={addMoney}>Receive</button>
        <button onClick={addWallet} className="p-6 btn-img-n  " ><img src="/add.svg" alt="" />
          <Desc2 title="Add New Wallet Here" p="-right-[12.5rem]" />
        </button>
      </div>

    </div>
  )
}

// Headline for below Cards
function Headline() {



  const { publicKeys, addresses, walletType } = useContext(WalletContext)
  return (
    <div className="top my-4 flex justify-between items-center gap-4">
      <div className="flex gap-2 items-center justify-center ">
        {walletType === 'sol' && <div className="bg3 rounded-full px-4 py-2 "  >{publicKeys.length}</div>}
        {walletType === 'eth' && <div className="bg3 rounded-full px-4 py-2 "  >{addresses.length}</div>}

        <h2>  Wallets You Have</h2>
      </div>
      <div className="circle "><img src="/arr.svg" alt="" /></div>
    </div>
  )
}

function Card({ name, amount, img, type, index }) {
  const navigate = useNavigate();

  function gotoThisWallet() {
    navigate(`/${amount}?WalletType=${type}&index=${index}`)
  }

  function copyToClipBoard(e) {
    e.stopPropagation()
    navigator.clipboard.writeText(amount);
  }

  return (
    <>
      <div onClick={gotoThisWallet} className="p-2 cursor-pointer wallet flex bg-[#F2F2F2] rounded-full justify-between">
        <div className="left f">
          <div className="circle"><img src={img} alt="" /></div>
          <h4>{name}</h4>
        </div>
        <div className="right f">
          <h4 className="w-[8ch] mr-3 whitespace-nowrap overflow-hidden text-ellipsis">{amount}</h4>
          <button onClick={copyToClipBoard} className="circle"><img src="/cpy.svg" alt="" /></button>
        </div>
      </div>

    </>
  )
}

function ToggleWallet() {
  const { walletType, setWalletType } = useContext(WalletContext)

  function toggleSOL() {
    setWalletType("sol")
  }
  function toggleETH() {
    setWalletType("eth")
  }
  function toggleBTC() {
    setWalletType("btc")
  }

  return (
    <>
      <button onClick={toggleSOL} className={` ${walletType === 'sol' ? 'bg-n' : 'bg3'}`}  >SOL</button >
      <button onClick={toggleETH} className={` ${walletType === 'eth' ? 'bg-n' : 'bg3'}`}  >ETH</button >
      <button onClick={toggleBTC} className={` ${walletType === 'btc' ? 'bg-n' : 'bg3'}`}  >BTC</button >

    </>
  )
}


export default MainUI

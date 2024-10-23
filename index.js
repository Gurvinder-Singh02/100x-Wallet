import nacl from "tweetnacl"; // lets you do cryptogrpahy
import { mnemonicToSeedSync } from "bip39"; // To generate and convert mnemonics to seed.
import { derivePath } from "ed25519-hd-key"; //hd wallet For hierarchical deterministic (HD) wallet key derivation.
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";


// mnemonic from bagpack
const mnemonic = "taxi exhibit price canoe depart gravity crime lemon identify spin arrow legend"

const seed = mnemonicToSeedSync(mnemonic);

const i = 0;

//solana wallet
const path = `m/44'/501'/${i}'/0'`; // Derivation path for Solana


const derivedSeed = derivePath(path, seed.toString("hex")).key;   // converted seed to hex and then from both derived path and hexed seed we got a key

const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // nacl genereated secret key from derivedkey  with nacl (edDSA algo)

console.log(Keypair.fromSecretKey(secret).publicKey.toBase58()); // now with the help of secret key we got our private public key pair and public is converted to base58 to be used


// Ethereium wallet with ECCDSA
const derivationPath = `m/44'/60'/${i}'/0'`;

const hdNode = HDNodeWallet.fromSeed(seed); //HDNodeWallet implement bip32 from which we can get the Tree of keys 
const child = hdNode.derivePath(derivationPath); // now from this key of trees we give our derivation  and result a child ( pvt key)
const privateKey = child.privateKey; // 
const wallet = new Wallet(privateKey); // now with help of pvt key generat the public key 

console.log(wallet.address) // access public key with .address


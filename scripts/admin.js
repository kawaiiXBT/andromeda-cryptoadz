const Web3 = require('web3')
const ethers = require('ethers')
let path = "m/44'/60'/0'/0/2";
const wallet = ethers.Wallet.fromMnemonic(process.env.DEPLOY_WALLET, path)

const provider = new Web3('https://andromeda.metis.io/?owner=1088')

const abi = require('../artifacts/contracts/Toadz.sol/Toadz.json')
const Toadz = '0xCA6D959Da2d2e1dBCF9f414377C258A416D65D52'

const amount = '50000000000000000000000' // 50k


getInfo = async () => {
	return new Promise( async (resolve, reject) => {
		try {
			let web3 = provider
			await web3.eth.accounts.wallet.add(wallet)
			let contract = new web3.eth.Contract(abi.abi, Toadz)
			console.log(wallet.address)
			let result = await contract.methods.getInfo().call({from: wallet.address})
			console.log(result)
			resolve(result)
		} catch (e) {
			console.error(e)
			reject(e)
		}
	})
}


mint = async () => {
	return new Promise( async (resolve, reject) => {
		try {
			console.log(wallet)
			let web3 = provider
			await web3.eth.accounts.wallet.add(wallet)
			let contract = new web3.eth.Contract(abi.abi, Toadz)
			let result = await contract.methods.purchase(1).send({from: wallet.address, gas: 1000000})
			console.log(result)
			resolve(result)
		} catch (e) {
			console.error(e)
			reject(e)
		}
	})
}

getInfo()
mint()
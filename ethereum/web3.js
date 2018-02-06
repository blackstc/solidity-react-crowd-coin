import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  // we are in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider)
} else {
  // we are on server *OR* there is no metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/wDLKFRfVVGvZRWJ8Dugi'
  )
  web3 = new Web3(provider)
}

export default web3

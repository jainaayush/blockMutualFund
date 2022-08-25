import {ethers} from 'ethers'

export const getWalletBalance = async () => {
  if(window.ethereum) {
    const result = await window.ethereum.request({method: 'eth_requestAccounts'})
      const data = await window.ethereum.request({method: 'eth_getBalance', params: [result[0], 'latest']})
      return ethers.utils.formatEther(data)
  } else {
    alert('Please add Metamask extension in browser')
  }
}

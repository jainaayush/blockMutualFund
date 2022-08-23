import React, {useState} from 'react'
import { Button } from 'antd';
import {ethers} from 'ethers'

import '../App.css';

export const WalletCard = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);


  const connectWalletHandler = () => {
    if(window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
      })
    } else {
      alert('Install Metamask')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    getUserBalance(newAccount)
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    .then(balance => {
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }

  return (
    <div className="walletCard">
      <Button type="primary" className="investbtn" onClick={connectWalletHandler}>
        connect
      </Button>
      <div>
        Address : {defaultAccount}
      </div>
      <div>
        Balance: {userBalance}
      </div>
    </div>
  )
}
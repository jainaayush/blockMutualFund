import { useState } from 'react'
import { Button,Table,Spin } from 'antd';

import { getAllCoinsData } from '../config/api'

import { DetailsModal } from './DetailsModal'
// import { WalletCard } from '../components/WalletCard'

import '../App.css';

const columnData = [
  {name:"The Twenty Fund",ticker:"CT20",price:"$1000",description:"Top 20 cryptocurrencies",amountInvested:"$1000",currentValue:"$1100",change:"10%",risk:"Low"},
  {name:"Top Two",ticker:"TOP2",price:"$800",description:"Top 2 coins",amountInvested:"$500",currentValue:"$600",change:"20%",risk:"Medium"},
  {name:"High Risk Alts",ticker:"AH10",price:"$500",description:" 10 Lowermarketcap coin",amountInvested:"$2000",currentValue:"$1800",change:"-10%",risk:"high"}
]
export const MainMenu = () => {
  const [backButton, showBackButton] = useState(false)
  const [topTwenty,setTopTwenty] = useState([])
  const [topTwo, setTopTwo] = useState([])
  const [highRisk, setHighRisk] = useState([])
  const [modalVisible,setModalVisible] = useState(false)
  const [modalData,setModalData] = useState([])

  const columns = [
    {
      title: 'Fund Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return (
          <span onClick={() =>{
            if(text === "The Twenty Fund"){
              setModalData({data:topTwenty,title:text})
            }else if(text === "Top Two") {
              setModalData({data:topTwo,title:text})
            }else {
              setModalData({data:highRisk,title:text})
            }
            handleModal()}
          }> 
            {text}
          </span>
        )
      },
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'tikcer',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount Invested',
      dataIndex: 'amountInvested',
      key: 'amountInvested',
    },
    {
      title: 'Current Value',
      dataIndex: 'currentValue',
      key: 'currentValue',
    },
    {
      title: '% change',
      dataIndex: 'change',
      key: 'symbol',
    },
    {
      title: 'Risk',
      dataIndex: 'risk',
      key: 'risk',
    },
    {
      title: 'Invest',
      dataIndex: 'invest',
      key: 'invest',
      render: () => {
        return (
          <Button key="back" className="custm-btn">
            Invest
          </Button>
        )
      },
    },
    {
      title: 'Withdraw',
      dataIndex: 'withdraw',
      key: 'withdraw',
      render: () => {
        return (
          <Button key="back"  className="custm-btn">
            withdraw
          </Button>
        )
      },
    }
    
  ]

  const handleInvestButton = async () => {
    showBackButton(true)
    const coinsData = await getAllCoinsData()
    setTopTwenty(coinsData.data.filter(item => item.rank <=20))
    setTopTwo(coinsData.data.filter(item => item.rank <=2))
    setHighRisk(coinsData.data.filter(item => item.rank <=60 && item.rank >=51))
  }

  const handleModal = () => {
    setModalVisible(true)
  }

  const handleBackButton = () => {
    showBackButton(!backButton)
  }

  const handleModalVisible = () => {
    setModalVisible(false)
  }

  const showLoader = () => {
    if(highRisk.length === 0 || topTwenty.length === 0 || topTwo.length === 0 )
    return true
    else return false
  }

  return (
    <div className="Invest-text">
      {modalVisible && 
        <DetailsModal 
          isVisible={true} 
          handleModalVisible={handleModalVisible}
          modalData={modalData}
        />
      }
      {!backButton && 
      <div>
      <Button type="primary" className="investbtn" onClick={handleInvestButton}>Invest</Button>
      {/* <WalletCard /> */}
      </div>
      }
      {backButton ? showLoader() ? <Spin /> : 
        <div className="tabledata">
          <Table columns={columns} dataSource={columnData} />
          <Button type="primary" onClick={handleBackButton}>Back</Button>
        </div>
        :<></>
      }
    </div> 
  );
}


import { useState } from 'react'
import { Button,Table,Spin } from 'antd';

import { getAllCoinsData,getOneETHValue } from '../config/api'

import { DetailsModal } from './DetailsModal'
// import { WalletCard } from '../components/WalletCard'
import { ConfirmationModal} from '../components/ConfirmationModal'
import { getAmount } from '../utils/getAmont'
import { getWalletBalance }  from '../utils/walletConnection'
import '../App.css';

const columnsData = [
  {name:"The Twenty Fund",ticker:"CT20",price:"$1000",description:"Top 20 cryptocurrencies",amountInvested:"$0",currentValue:"$1100",change:"0%",risk:"Low"},
  {name:"Top Two",ticker:"TOP2",price:"$800",description:"Top 2 coins",amountInvested:"$0",currentValue:"$600",change:"0%",risk:"Medium"},
  {name:"High Risk Alts",ticker:"AH10",price:"$500",description:" 10 Lowermarketcap coin",amountInvested:"$0",currentValue:"$1800",change:"0%",risk:"high"}
]
export const MainMenu = () => {
  const [backButton, showBackButton] = useState(false)
  const [topTwenty,setTopTwenty] = useState([])
  const [topTwo, setTopTwo] = useState([])
  const [highRisk, setHighRisk] = useState([])
  const [modalVisible,setModalVisible] = useState(false)
  const [confirmationModalVisible,setConfirmationVisible] = useState(false)
  const [columnData,setColumnData] = useState(columnsData)
  const [selectedFund, setSelectedFund] = useState()
  const [modalData,setModalData] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [modalType,setModalType] = useState()
  const [errorMessage, setErrorMessage] = useState()
  
  const columns = [
    {
      title: 'Fund Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (currentValue,allData) => {
        return (
          <p style={{"marginTop":"15px"}}>${(getAmount(allData.price))*(getAmount(allData.amountInvested))}</p>
        )

      }
    },
    {
      title: '% change',
      dataIndex: 'change',
      key: 'change',
    },
    {
      title: 'Risk',
      dataIndex: 'risk',
      key: 'risk',
    },
    {
      title: 'Invest',
      dataIndex: 'name',
      key: 'invest',
      render: (name) => {
        return (
          <Button key="back" className="custm-btn" onClick={(event) => {
            event.stopPropagation()
            setErrorMessage("")
            setModalType("Invest")
            setSelectedFund(name)
            setConfirmationVisible(true)
          }}>
            Invest
          </Button>
        )
      },
    },
    {
      title: 'Withdraw',
      dataIndex: 'name',
      key: 'withdraw',
      render: (name) => {
        return (
          <Button key="back"  className="custm-btn" onClick={(event) => {
            event.stopPropagation()
            setErrorMessage("")
            setModalType("Withdraw")
            setSelectedFund(name)
            setConfirmationVisible(true)
          }}>
            Withdraw
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

  const showLoader = () => {
    if(highRisk.length === 0 || topTwenty.length === 0 || topTwo.length === 0 )
    return true
    else return false
  }

  const handleRowClick = (row) => {
    if(row.name === "The Twenty Fund"){
      setModalData({data:topTwenty,title:row.name})
    }else if(row.name === "Top Two") {
      setModalData({data:topTwo,title:row.name})
    }else {
      setModalData({data:highRisk,title:row.name})
    }
    handleModal()
  }

  const calculatePercentage = (props) => {
    const prevAmt = getAmount(props.prev)
    if(prevAmt === 0)
      return `${props.new.toFixed(2)}%`
    else {
      const latest = prevAmt+props.new
      const diff = latest-prevAmt
      const percentage = ((diff-prevAmt).toFixed(2))/100
      return `${percentage.toFixed(2)}%`
    }
  }

  const handleInvest = async (value) => {
    const walletBalance = await getWalletBalance()
    if(walletBalance === undefined)
      setErrorMessage("")
    if(typeof(value) === "number" && modalType === "Invest") {
      if(walletBalance >= value) {
        setIsLoading(true)
        setConfirmationVisible(false)
        const oneEthValue = await getOneETHValue()
        const totalAmount = (oneEthValue.quote.USD.price) * value 
        columnData.forEach(item => {
          if(item.name === selectedFund){
            item.change =  calculatePercentage({prev:item.amountInvested,new:totalAmount})
            item.amountInvested = `$${(getAmount(item.amountInvested) + totalAmount).toFixed(2)}`
          }
        })
        setColumnData(columnData)
        setIsLoading(false)
      } 
      
      if(walletBalance < value) {
        setErrorMessage("Not enough balance in your wallet")
      }
    } else {
      setIsLoading(true) 
      setConfirmationVisible(false)
      setTimeout(() => {
        columnData.forEach(item => {
          if(item.name === selectedFund){
            item.amountInvested = '$0'
            item.change = '0%'
          }
        })
        setColumnData(columnData)
        setIsLoading(false)
      },500)
    }
  }

  return (
    <div className="Invest-text">
      {modalVisible && 
        <DetailsModal 
          isVisible={true} 
          setModalVisible={setModalVisible}
          modalData={modalData}
          coinsTableData={columnData}
        />
      }
      {confirmationModalVisible && 
        <ConfirmationModal 
          modalType={modalType}
          isVisible={true} 
          handleInvest={handleInvest}
          setConfirmationVisible={setConfirmationVisible}
          errorMessage={errorMessage}
      />
      }
      
      {!backButton && 
      <div>
      <Button type="primary" className="investbtn" onClick={handleInvestButton}>Invest</Button>
      {/* <WalletCard /> */}
      </div>
      }
      {backButton ? showLoader() ? <Spin /> : 
      isLoading ? <Spin /> : 
        <div className="tabledata">
          <Table  
            onRow={(record) => {
              return {
                onClick: () => {handleRowClick(record)}, // click row
              };
             }} 
             columns={columns} 
             dataSource={columnData} 
            />
          <Button type="primary" onClick={handleBackButton}>Back</Button>
        </div>
        :<></>
      }
    </div> 
  );
}


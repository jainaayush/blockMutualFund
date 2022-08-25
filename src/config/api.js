import axios from 'axios'

export const getAllCoinsData = async () => {
  const data= await axios.get(`https://testtaskmutualfund.herokuapp.com/coins`)
  return data.data
}

export const getCoinsDetailsByID = async (modalData) => {
  let result = await Promise.all(
    modalData.data.map(async (item,index) => {
      const result = await axios.get(`https://testtaskmutualfund.herokuapp.com/coins/${item.id}`)
      return Object.values(result.data.data)[0]
    })
  )
  return result
}

export const getOneETHValue = async () => {
  const result= await axios.get(`https://testtaskmutualfund.herokuapp.com/coins/${1027}`)
  return Object.values(result.data.data)[0]
}
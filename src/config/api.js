import axios from 'axios'

export const getAllCoinsData = async () => {
  const data= await axios.get(`/v1/cryptocurrency/map`,{headers: {'X-CMC_PRO_API_KEY':'583eefc0-111d-4fcf-98fe-04b32beecbed'}})
  return data.data
}

export const getCoinsDetailsByID = async (modalData) => {
  debugger
  let result = await Promise.all(
    modalData.data.map(async (item,index) => {
      const result = await axios.get(`v1/cryptocurrency/quotes/latest?id=${item.id}`,{headers: {'X-CMC_PRO_API_KEY':'583eefc0-111d-4fcf-98fe-04b32beecbed'}})
      return Object.values(result.data.data)[0]
    })
  )
  return result
}
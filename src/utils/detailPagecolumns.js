export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ticker',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Price',
    dataIndex: 'quote',
    key: 'quote',
    render: (text) => {
      return (
      <p>${text.USD.price}</p>
      )
    },
  },
  {
    title: 'Ammount Invested',
    dataIndex: 'amountInvested',
    key: 'amountInvested',
    render: () => {
      return (
      <p>$1000</p>
      )
    },
  },
  {
    title: '% changed',
    dataIndex: 'changed',
    key: 'changed',
    render: () => {
      return (
      <p>7%</p>
      )
    },
  }
]
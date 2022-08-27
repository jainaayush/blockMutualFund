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
    title: 'Amount Invested',
    dataIndex: 'amountInvested',
    key: 'amountInvested',
  },
  {
    title: '% changed',
    dataIndex: 'changed',
    key: 'changed',
  }
]
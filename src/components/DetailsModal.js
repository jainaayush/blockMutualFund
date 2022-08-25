import React, { useState,useEffect } from 'react';
import { Button, Modal,Table,Spin } from 'antd';
import { getCoinsDetailsByID } from '../config/api'
import { columns } from '../utils/detailPagecolumns'
import { getAmount } from '../utils/getAmont'

export const DetailsModal = ({isVisible,setModalVisible,modalData,coinsTableData}) => {
  const [visible, setVisible] = useState(isVisible);
  const [columnData, setCoumnData] = useState([])

  useEffect(() => { 
      handleTableData();
      // eslint-disable-next-line
  },[]);

  const handleTableData = async () => {
    let result = await getCoinsDetailsByID(modalData)
    const parentData = coinsTableData.find(item => item.name === modalData.title )
    const amount = getAmount(parentData.amountInvested)
    
    result.forEach(item => {
      if (amount === 0)
        item.amountInvested = "$0"
      else
      item.amountInvested = `$${amount/result.length}`
    })
    setCoumnData(result)
  }

  const handleCancel = () => {
    setModalVisible(false)
    setVisible(false);
  };
  return (
    <>
      <Modal className="modal_main"
        visible={visible}
        title="Fund Screen"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="custm-btn">
            Return
          </Button>
        ]}
      >
        {columnData.length === 0  ? <Spin/> :
          <div>
            <p className="modal_data_title">{modalData.title}</p>
            <div className="tabledata">
            <Table columns={columns} dataSource={columnData} />
            </div>
          </div>
        }
      </Modal>
    </>
  );
};

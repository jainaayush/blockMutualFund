import React, { useState,useEffect } from 'react';
import { Button, Modal,Table,Spin } from 'antd';
import { getCoinsDetailsByID } from '../config/api'
import { columns } from '../utils/detailPagecolumns'

export const DetailsModal = ({isVisible,handleModalVisible,modalData}) => {
  const [visible, setVisible] = useState(isVisible);
  const [columnData, setCoumnData] = useState([])

  useEffect(() => { 
      handleTableData();
      // eslint-disable-next-line
  },[]);

  const handleTableData = async () => {
    let result = await getCoinsDetailsByID(modalData)
    await setCoumnData(result)
  }

  const handleCancel = () => {
    handleModalVisible()
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

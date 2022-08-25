import React, { useState } from 'react';
import { Button, Modal,InputNumber} from 'antd';

export const ConfirmationModal = ({modalType,isVisible,handleInvest,setConfirmationVisible,errorMessage}) => {
  const [amount,setAmount] = useState()

  const handleCancel = () => {
    setConfirmationVisible(false)
  };

  const handleInvestButton = () => {
    handleInvest(amount);
  }

  return (
    <>
      <Modal
        visible={isVisible}
        title={modalType === "Invest" ?"Invest" : "Withdraw" } 
        onCancel={handleCancel}
        footer={[
          <Button key="back" 
            onClick={handleInvestButton} 
            className="custm-btn"
            disabled={modalType === "Invest" &&  amount === undefined ? true :false}
          >
           {modalType === "Invest" ?"Invest" : "Withdraw" } 
          </Button>
        ]}
      >
        {modalType === "Invest"  
          ?
          <div>
            <InputNumber style={{"width": "100%"}} 
              placeholder="Enter Amount" 
              value={amount} 
              onChange={(value) => setAmount(value)}
            />
              <span className="error-message">{errorMessage}</span>
          </div>
          :
          <div>
            Are you sure you want to Withdraw?
          </div>
      }
      </Modal>
    </>
  );
};

import React from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

const MyModal = (props) => {
  const { children, titleText, visible, setVisible = () => {} } = props;
  return (
    <>
      <Modal
        className={"login_model"}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;

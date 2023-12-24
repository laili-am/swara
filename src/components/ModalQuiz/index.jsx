import React, { useState } from "react";
import { Modal, Row } from "antd";
import CustomButton from "../CustomButton";

const ModalQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {};

  return (
    <>
      <CustomButton variant={"secondary"} onClick={showModal}>
        Submit
      </CustomButton>
      <Modal
        open={open}
        title='Apakah Anda yakin dengan Jawaban Anda?'
        onCancel={handleCancel}
        width={400}
        footer={[
          <Row justify='end'>
            <CustomButton variant={"secondary"} onClick={handleSubmit}>
              Tidak Yakin
            </CustomButton>

            <CustomButton variant={"primary"} onClick={handleSubmit}>
              Yakin
            </CustomButton>
          </Row>,
        ]}>
        <p> Jangan lupa pastikan telah mengisi semua pertanyaan.</p>
      </Modal>
    </>
  );
};
export default ModalQuiz;

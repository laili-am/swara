import React, { useState } from "react";
import { Modal, Row } from "antd";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";

const ModalScore = ({ isOpen, setIsOpen, score }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsOpen(false);
    // navigate("/Pembelajaran");
    window.location = "/Pembelajaran"
    console.log("baru")
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        width={400}
        footer={[
          <Row justify='center'>
            <CustomButton
              variant={"secondary"}
              onClick={() => navigate("/Leaderboards")}>
              Lihat Leaderboards
            </CustomButton>
            <CustomButton
              variant={"secondary"}
              onClick={() => window.location = "/Pembelajaran"}>
              Selesai
            </CustomButton>
          </Row>,
        ]}>
        <Row justify={"center"}>
          <h5> Selamat Score Anda</h5>
        </Row>
        <Row justify={"center"}>
          <h1>{score}</h1>
        </Row>
        <Row justify={"center"}>
          <h5>Lihat Posisimu di Leaderboards</h5>
        </Row>
      </Modal>
    </>
  );
};
export default ModalScore;

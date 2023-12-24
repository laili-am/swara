import { Radio, Space, Modal, Row } from "antd";
import style from "./ModalAvatar.module.css";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { EDITavatar } from "../../graphql/mutation";
import { GETUserbyId, GETavatarbyid } from "../../graphql/query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import CustomButton from "../CustomButton";

const ModalAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const idUser = JSON.parse(Cookies.get("user")).id;
  const { data: dataFetched } = useQuery(GETUserbyId, {
    variables: { idUser },
  });

  const [dataAvatar, setDataAvatar] = useState("");

  useEffect(() => {
    setDataAvatar(dataFetched?.mahasiswa_by_pk.avatar);
  }, [dataFetched]);

  const onChange = (e) => {
    setDataAvatar(e.target.value);
  };

  const [updateAvatar] = useMutation(EDITavatar, {
    refetchQueries: [GETavatarbyid],
  });
  const editAvatar = (newAvatar) => {
    console.log("idUser, newAvatar: ", idUser, newAvatar);
    updateAvatar({
      variables: {
        id_mahasiswa: idUser,
        avatar: newAvatar,
      },
    });
  };

  const handleSubmit = (e) => {
    console.log("triger??");
    if (dataAvatar) {
      editAvatar(dataAvatar);
      setDataAvatar("");
    }
  };
  return (
    <>
      <CustomButton variant={"secondary"} onClick={showModal}>
        Pilih Avatar Anda
      </CustomButton>
      <Modal
        open={open}
        title='Pilih Avatar Anda'
        onCancel={handleCancel}
        // width={500}
        footer={[
          <Row justify={"end"}>
            <CustomButton variant={"primary"} onClick={handleSubmit}>
              Simpan
            </CustomButton>
          </Row>,
        ]}>
        <Row justify='center'>
          <Radio.Group onChange={onChange}>
            <Space direction='horizontal'>
              <Radio.Button
                name='avatar'
                value={"assets/avatar/sopran.png"}
                className={style.radio}
                onChange={onChange}>
                <img
                  className={style.imgAvatar}
                  src={require(`../../assets/avatar/sopran.png`)}
                  alt='mahasiswa'
                />
              </Radio.Button>
              <Radio.Button
                name='avatar'
                value={"assets/avatar/alto.png"}
                className={style.radio}
                onChange={onChange}>
                <img
                  className={style.imgAvatar}
                  src={require(`../../assets/avatar/alto.png`)}
                  alt='mahasiswa'
                />
              </Radio.Button>
              <Radio.Button
                name='avatar'
                value={"assets/avatar/tenor.png"}
                className={style.radio}
                onChange={onChange}>
                <img
                  className={style.imgAvatar}
                  src={require(`../../assets/avatar/tenor.png`)}
                  alt='mahasiswa'
                />
              </Radio.Button>
              <Radio.Button
                name='avatar'
                value={"assets/avatar/bass.png"}
                className={style.radio}
                onChange={onChange}>
                <img
                  className={style.imgAvatar}
                  src={require(`../../assets/avatar/bass.png`)}
                  alt='mahasiswa'
                />
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Row>
      </Modal>
    </>
  );
};
export default ModalAvatar;

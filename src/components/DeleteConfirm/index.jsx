import React from "react";
import { Button, message, Popconfirm } from "antd";

const confirm = (e) => {
  console.log(e);
  message.success("Data berhasil dihapus");
};
const cancel = (e) => {
  console.log(e);
  message.error("Data tidak dihapus");
};
const DeleteConfirm = () => (
  <Popconfirm
    title='Apakah Anda yakin menghapus ini?'
    onConfirm={confirm}
    onCancel={cancel}
    okText='Yakin'
    cancelText='Tidak'>
    <Button danger>Delete</Button>
  </Popconfirm>
);
export default DeleteConfirm;

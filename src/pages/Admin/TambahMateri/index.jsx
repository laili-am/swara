import LayoutAdmin from "../../../layouts/Admin";
import { INSERTmateri } from "../../../graphql/mutation";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Row, Col } from "antd";
import { CustomButton, CustomInput, UploadButton } from "../../../components";
import { storage } from "../../../firebase/firebase";
import style from "./TambahMateri.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GETmateri } from "../../../graphql/query";
import { useNavigate } from "react-router-dom";

function TambahMateri() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    judul_materi: "",
    materi: "",
    media_gambar: "",
    media_video: "",
  });

  const image = useRef("");
  const [file, setFile] = useState(null);
  const [url, setURL] = useState();
  const handleFileUpload = async (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const path = `/image/${file.name}`;
    const ref = storage.ref(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    setURL(url);
    return alert("Gambar telah diterima");
  };

  const video = useRef("");
  const [fileVideo, setFileVideo] = useState(null);
  const [urlVideo, setURLVideo] = useState();
  const handleFileUploadVideo = async (e) => {
    if (e.target.files[0]) setFileVideo(e.target.files[0]);
  };
  const handleUploadVideo = async (e) => {
    e.preventDefault();
    const path = `/video/${fileVideo.name}`;
    const ref = storage.ref(path);
    await ref.put(fileVideo);
    const urlVideo = await ref.getDownloadURL();
    setURLVideo(urlVideo);
    return alert("Video telah diterima");
  };
  useEffect(() => {
    console.log("url: ", url);
  }, [url]);

  const onChange = (e) => {
    if (!e.target) {
      setData({
        ...data,
        materi: e,
      });
      return;
    }
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const [insertMateri] = useMutation(INSERTmateri, {
    refetchQueries: [GETmateri],
  });
  const tambahMateri = (newMateri) => {
    insertMateri({
      variables: {
        judul_materi: newMateri.judul_materi,
        materi: newMateri.materi,
        media_gambar: newMateri.media_gambar,
        media_video: newMateri.media_video,
      },
    });
  };

  const handleSubmit = (e) => {
    if (data.judul_materi && data.materi) {
      const newData = {
        judul_materi: data.judul_materi,
        materi: data.materi,
        media_gambar: url,
        media_video: urlVideo,
      };
      tambahMateri(newData);
      setData({
        ...data,
        judul_materi: "",
        materi: "",
        media_gambar: "",
        media_video: "",
      });
      alert("Penambahan materi berhasil!");
      navigate("/admin/Kelola-Materi");
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  console.log(data);
  return (
    <>
      <LayoutAdmin>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Tambah Materi</h2>
          <p className={style.body1}>Judul Materi</p>

          <Form.Item
            value={data.judul_materi}
            className={style.input}
            name='judul_materi'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Judul materi tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan judul materi' />
          </Form.Item>

          <p className={style.body1}>Materi</p>
          <ReactQuill theme='snow' value={data.materi} onChange={onChange} />

          <p className={style.body1}>Upload Media Gambar</p>
          <Row>
            <CustomInput
              type='file'
              name='media_gambar'
              ref={image}
              onChange={handleFileUpload}
              className={style.inputmedia}
            />
            <CustomButton onClick={handleUpload} variant={"secondary"}>
              Upload Gambar
            </CustomButton>
          </Row>
          <p className={style.body1}>Upload Media Video</p>
          <Row>
            <CustomInput
              type='file'
              name='media_video'
              ref={video}
              onChange={handleFileUploadVideo}
              className={style.inputmedia}
            />
            <CustomButton onClick={handleUploadVideo} variant={"secondary"}>
              Upload Video
            </CustomButton>
          </Row>
          <CustomButton
            variant='secondary'
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}>
            Simpan
          </CustomButton>
        </Form>
      </LayoutAdmin>
    </>
  );
}

export default TambahMateri;

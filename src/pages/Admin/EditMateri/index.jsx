import { useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { EDITmateri } from "../../../graphql/mutation";
import { GETMateribyId, GETmateri } from "../../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Row } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { useEffect, useRef, useState } from "react";
import style from "./EditMateri.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../../../firebase/firebase";

function EditMateri() {
  const { id_materi } = useParams();
  const { data: dataFetched } = useQuery(GETMateribyId, {
    variables: { id_materi },
  });

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
    setData({
      judul_materi: dataFetched?.materi_by_pk.judul_materi,
      materi: dataFetched?.materi_by_pk.materi,
      media_gambar: dataFetched?.materi_by_pk.media_gambar,
      media_video: dataFetched?.materi_by_pk.media_video,
    });
  }, [dataFetched]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const [updateMateri] = useMutation(EDITmateri, {
    refetchQueries: [GETmateri],
  });
  const EditMateri = (newMateri) => {
    updateMateri({
      variables: {
        id_materi: id_materi,
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
      EditMateri(newData);
      setData({
        ...data,
        judul_materi: "",
        materi: "",
        media_gambar: "",
        media_video: "",
      });
      alert("Edit materi berhasil!");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Edit Materi</h2>
          <p className={style.body1}>Judul Materi</p>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Judul materi tidak boleh kosong!",
              },
            ]}>
            <CustomInput
              value={data?.judul_materi}
              className={style.input}
              name='judul_materi'
              onChange={onChange}
            />
          </Form.Item>
          <p className={style.body1}>Materi</p>

          <ReactQuill
            theme='snow'
            value={data?.materi}
            onChange={(e) => setData((prev) => ({ ...prev, materi: e }))}
            id='materi'
          />
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

export default EditMateri;

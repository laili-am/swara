import { useQuery } from "@apollo/client";
import { GETavatarbyid } from "../../graphql/query";
import Cookies from "js-cookie";
import { Row } from "antd";
import style from "./Avatar.module.css";

function Avatar() {
  const idUser = JSON.parse(Cookies.get("user")).id;
  const { loading, error, data } = useQuery(GETavatarbyid, {
    variables: { id_mahasiswa: idUser },
  });
  console.log("id_mahasiswa: ", idUser, data);
  return (
    <>
      <Row justify={"center"}>
        <img
          src={
            data?.mahasiswa_by_pk.avatar
              ? require(`../../${data?.mahasiswa_by_pk.avatar}`)
              : require(`../../assets/avatar/no_avatar.png`)
          }
          alt='avatar'
          className={style.avatar}
        />
      </Row>
    </>
  );
}

export default Avatar;

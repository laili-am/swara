import { Row, Col } from "antd";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import style from "./Leaderboards.module.css";
import { useQuery } from "@apollo/client";
import { GETAllSoal, GETmahasiswaLeaderboards } from "../../../graphql/query";

function Leaderboards() {
  const { loading, error, data } = useQuery(GETmahasiswaLeaderboards);
  const { data: allSoal } = useQuery(GETAllSoal);
  const totalSoal =
    allSoal?.soal_miniquiz.length +
    allSoal?.soal_posttest.length +
    allSoal?.soal_pretest.length;
  console.log("allSoal: ", allSoal);
  console.log("totalSoal: ", totalSoal);

  return (
    <>
      <LayoutMahasiswa>
        <h2 style={{ textAlign: "center" }}>Leaderboards</h2>
        <Row justify='center'>
          {data?.mahasiswa.map((item) => {
            const score = item.total_score
              ? Math.round(item.total_score * 35)
              : 0;
            return (
              <>
                <Col key={item.nama} span={16} className={style.background}>
                  <Row>
                    <Col span={2}>
                      <img
                        className={style.img}
                        src={
                          !item.avatar
                            ? require(`../../../assets/avatar/no_avatar.png`)
                            : require(`../../../${item.avatar}`)
                        }
                        alt='mahasiswa'
                      />
                    </Col>
                    <Col offset={1} span={19}>
                      <h5 className={style.text}>{item.nama}</h5>
                    </Col>
                    <Col span={2}>
                      <h5 className={style.text}>{score}</h5>
                    </Col>
                  </Row>
                </Col>
              </>
            );
          })}
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default Leaderboards;

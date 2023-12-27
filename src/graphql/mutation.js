import { gql } from "@apollo/client";

export const EditJawabanSama = gql`
  mutation EditJawaban(
    $id_mahasiswa: Int
    $id_soal_pretest: Int
    $jawaban_pretest: String
  ) {
    update_pretest(
      where: {
        _and: {
          id_mahasiswa: { _eq: $id_mahasiswa }
          id_soal_pretest: { _eq: $id_soal_pretest }
        }
      }
      _set: { jawaban_pretest: $jawaban_pretest }
    ) {
      returning {
        id_pretest
        jawaban_pretest
        id_soal_pretest
        id_mahasiswa
      }
    }
  }
`;

export const ADDjoinmahasiswamateri = gql`
  mutation MyMutation($id_mahasiswa: Int!, $id_materi: Int!) {
    insert_mahasiswa_materi(
      objects: { id_mahasiswa: $id_mahasiswa, id_materi: $id_materi }
      on_conflict: { constraint: mahasiswa_materi_id_mahasiswa_id_materi_key }
    ) {
      returning {
        id
      }
    }
  }
`;

export const GETuser_register = gql`
  mutation MyMutation(
    $nama: String!
    $email: String!
    $password: String!
    $konfirmasi_password: String!
  ) {
    insert_mahasiswa(
      objects: {
        nama: $nama
        email: $email
        password: $password
        konfirmasi_password: $konfirmasi_password
      }
    ) {
      returning {
        id_mahasiswa
      }
    }
  }
`;

// INSERT //

export const INSERT_url_soal_pretest = gql`
  mutation MyMutation($pretest_url: String!) {
    insert_url_soal_pretest(objects: { pretest_url: $pretest_url }) {
      returning {
        pretest_url
        id_pretest
      }
    }
  }
`;

export const INSERT_url_soal_posttest = gql`
  mutation MyMutation($posttest_url: String!) {
    insert_url_soal_posttest(objects: { posttest_url: $posttest_url }) {
      returning {
        posttest_url
        id_posttest
      }
    }
  }
`;

export const INSERTsoal_pretest = gql`
  mutation MyMutation(
    $soal_pretest: String!
    $pilihan_a_pretest: String!
    $pilihan_b_pretest: String!
    $pilihan_c_pretest: String!
    $pilihan_d_pretest: String!
    $jawaban_benar_pretest: String!
  ) {
    insert_soal_pretest(
      objects: {
        soal_pretest: $soal_pretest
        pilihan_a_pretest: $pilihan_a_pretest
        pilihan_b_pretest: $pilihan_b_pretest
        pilihan_c_pretest: $pilihan_c_pretest
        pilihan_d_pretest: $pilihan_d_pretest
        jawaban_benar_pretest: $jawaban_benar_pretest
      }
    ) {
      returning {
        id_soal_pretest
      }
    }
  }
`;

export const INSERTsoal_posttest = gql`
  mutation MyMutation(
    $soal_posttest: String!
    $pilihan_a_posttest: String!
    $pilihan_b_posttest: String!
    $pilihan_c_posttest: String!
    $pilihan_d_posttest: String!
    $jawaban_benar_posttest: String!
  ) {
    insert_soal_posttest(
      objects: {
        soal_posttest: $soal_posttest
        pilihan_a_posttest: $pilihan_a_posttest
        pilihan_b_posttest: $pilihan_b_posttest
        pilihan_c_posttest: $pilihan_c_posttest
        pilihan_d_posttest: $pilihan_d_posttest
        jawaban_benar_posttest: $jawaban_benar_posttest
      }
    ) {
      returning {
        id_soal_posttest
      }
    }
  }
`;

export const INSERTsoal_miniquiz = gql`
  mutation MyMutation(
    $id_materi: Int!
    $soal_miniquiz: String!
    $pilihan_a_miniquiz: String!
    $pilihan_b_miniquiz: String!
    $pilihan_c_miniquiz: String!
    $pilihan_d_miniquiz: String!
    $jawaban_benar_miniquiz: String!
  ) {
    insert_soal_miniquiz(
      objects: {
        id_materi: $id_materi
        soal_miniquiz: $soal_miniquiz
        pilihan_a_miniquiz: $pilihan_a_miniquiz
        pilihan_b_miniquiz: $pilihan_b_miniquiz
        pilihan_c_miniquiz: $pilihan_c_miniquiz
        pilihan_d_miniquiz: $pilihan_d_miniquiz
        jawaban_benar_miniquiz: $jawaban_benar_miniquiz
      }
    ) {
      returning {
        id_soal_miniquiz
      }
    }
  }
`;

export const INSERTmateri = gql`
  mutation MyMutation(
    $judul_materi: String!
    $materi: String!
    $media_gambar: String
    $media_video: String
  ) {
    insert_materi(
      objects: {
        judul_materi: $judul_materi
        materi: $materi
        media_gambar: $media_gambar
        media_video: $media_video
      }
    ) {
      returning {
        id_materi
      }
    }
  }
`;

export const INSERTjawabanPosttest = gql`
  mutation MyMutation(
    $id_mahasiswa: Int!
    $id_posttest: Int!
    $jawaban_posttest: String!
  ) {
    insert_posttest(
      objects: {
        id_mahasiswa: $id_mahasiswa
        id_posttest: $id_posttest
        jawaban_posttest: $jawaban_posttest
        selesai: true
      }
    ) {
      returning {
        jawaban_posttest
        id_posttest
        id_mahasiswa
      }
    }
  }
`;

export const INSERTjawabanPretest = gql`
  mutation MyMutation(
    $id_mahasiswa: Int!
    $id_soal_pretest: Int!
    $jawaban_pretest: String!
  ) {
    insert_pretest(
      objects: {
        id_mahasiswa: $id_mahasiswa
        id_soal_pretest: $id_soal_pretest
        jawaban_pretest: $jawaban_pretest
        selesai: true
      }
    ) {
      returning {
        id_pretest
        jawaban_pretest
        id_mahasiswa
        id_soal_pretest
      }
    }
  }
`;

// DELETE //

export const DELETEuser = gql`
  mutation MyMutation($id_mahasiswa: Int!) {
    delete_mahasiswa_by_pk(id_mahasiswa: $id_mahasiswa) {
      id_mahasiswa
    }
  }
`;

export const DELETEmateri = gql`
  mutation MyMutation($id_materi: Int!) {
    delete_materi_by_pk(id_materi: $id_materi) {
      id_materi
    }
  }
`;

export const DELETEposttest = gql`
  mutation MyMutation($id_soal_posttest: Int!) {
    delete_soal_posttest_by_pk(id_soal_posttest: $id_soal_posttest) {
      id_soal_posttest
    }
  }
`;

export const DELETEpretest = gql`
  mutation MyMutation($id_soal_pretest: Int!) {
    delete_soal_pretest_by_pk(id_soal_pretest: $id_soal_pretest) {
      id_soal_pretest
    }
  }
`;

export const DELETEminiquiz = gql`
  mutation MyMutation($id_soal_miniquiz: Int!) {
    delete_soal_miniquiz_by_pk(id_soal_miniquiz: $id_soal_miniquiz) {
      id_soal_miniquiz
    }
  }
`;

export const DELETEpretesturl = gql`
  mutation MyMutation($id_pretest: Int!) {
    delete_url_soal_pretest_by_pk(id_pretest: $id_pretest) {
      id_pretest
      pretest_url
    }
  }
`;

export const DELETEposttesturl = gql`
  mutation MyMutation($id_posttest: Int!) {
    delete_url_soal_posttest_by_pk(id_posttest: $id_posttest) {
      id_posttest
      posttest_url
    }
  }
`;
// 
export const DELETEmahasiswamateribyidmahasiswa = gql`
  mutation MyMutation1($id_mahasiswa:Int!) {
    delete_mahasiswa_materi(where: {id_mahasiswa: {_eq: $id_mahasiswa}}) {
      returning {
        id
      }
    }
  }
`
export const DELETEpretestbyidmahasiswa = gql`
  mutation MyMutation2($id_mahasiswa:Int!) {
    delete_pretest(where: {id_mahasiswa: {_eq: $id_mahasiswa}}) {
      returning {
        is_submited
      }
    }
  }
`
export const DELETEminiquizbyidmahasiswa = gql`
  mutation MyMutation3($id_mahasiswa:Int!) {
    delete_miniquiz(where: {id_mahasiswa: {_eq: $id_mahasiswa}}) {
      returning {
        is_submited
      }
    }
  }
`
export const DELETEposttestbyidmahasiswa = gql`
  mutation MyMutation4($id_mahasiswa:Int!) {
    delete_posttest(where: {id_mahasiswa: {_eq: $id_mahasiswa}}) {
      returning {
        is_submited
      }
    }
  }
`

// UPDATE //

export const GETlevel = gql`
  mutation MyMutation($id_mahasiswa: Int!, $level: Int!) {
    update_mahasiswa_by_pk(
      pk_columns: { id_mahasiswa: $id_mahasiswa }
      _set: { id_mahasiswa: $id_mahasiswa, level: $level }
    ) {
      id_mahasiswa
      level
    }
  }
`;

export const EDIT_url_pretest = gql`
  mutation MyMutation($id_pretest: Int!, $pretest_url: String!) {
    update_url_soal_pretest_by_pk(
      pk_columns: { id_pretest: $id_pretest }
      _set: { id_pretest: $id_pretest, pretest_url: $pretest_url }
    ) {
      id_pretest
      pretest_url
    }
  }
`;

export const EDIT_url_posttest = gql`
  mutation MyMutation($id_posttest: Int!, $posttest_url: String!) {
    update_url_soal_posttest_by_pk(
      pk_columns: { id_posttest: $id_posttest }
      _set: { id_posttest: $id_posttest, posttest_url: $posttest_url }
    ) {
      id_posttest
      posttest_url
    }
  }
`;

export const EDITpretest = gql`
  mutation MyMutation(
    $id_soal_pretest: Int!
    $soal_pretest: String!
    $pilihan_a_pretest: String!
    $pilihan_b_pretest: String!
    $pilihan_c_pretest: String!
    $pilihan_d_pretest: String!
    $jawaban_benar_pretest: String!
  ) {
    update_soal_pretest_by_pk(
      pk_columns: { id_soal_pretest: $id_soal_pretest }
      _set: {
        id_soal_pretest: $id_soal_pretest
        soal_pretest: $soal_pretest
        pilihan_a_pretest: $pilihan_a_pretest
        pilihan_b_pretest: $pilihan_b_pretest
        pilihan_c_pretest: $pilihan_c_pretest
        pilihan_d_pretest: $pilihan_d_pretest
        jawaban_benar_pretest: $jawaban_benar_pretest
      }
    ) {
      id_soal_pretest
    }
  }
`;

export const EDITminiquiz = gql`
  mutation MyMutation(
    $id_soal_miniquiz: Int!
    $soal_miniquiz: String!
    $pilihan_a_miniquiz: String!
    $pilihan_b_miniquiz: String!
    $pilihan_c_miniquiz: String!
    $pilihan_d_miniquiz: String!
    $jawaban_benar_miniquiz: String!
  ) {
    update_soal_miniquiz_by_pk(
      pk_columns: { id_soal_miniquiz: $id_soal_miniquiz }
      _set: {
        id_soal_miniquiz: $id_soal_miniquiz
        soal_miniquiz: $soal_miniquiz
        pilihan_a_miniquiz: $pilihan_a_miniquiz
        pilihan_b_miniquiz: $pilihan_b_miniquiz
        pilihan_c_miniquiz: $pilihan_c_miniquiz
        pilihan_d_miniquiz: $pilihan_d_miniquiz
        jawaban_benar_miniquiz: $jawaban_benar_miniquiz
      }
    ) {
      id_soal_miniquiz
    }
  }
`;

export const EDITposttest = gql`
  mutation MyMutation(
    $id_soal_posttest: Int!
    $soal_posttest: String!
    $pilihan_a_posttest: String!
    $pilihan_b_posttest: String!
    $pilihan_c_posttest: String!
    $pilihan_d_posttest: String!
    $jawaban_benar_posttest: String!
  ) {
    update_soal_posttest_by_pk(
      pk_columns: { id_soal_posttest: $id_soal_posttest }
      _set: {
        id_soal_posttest: $id_soal_posttest
        soal_posttest: $soal_posttest
        pilihan_a_posttest: $pilihan_a_posttest
        pilihan_b_posttest: $pilihan_b_posttest
        pilihan_c_posttest: $pilihan_c_posttest
        pilihan_d_posttest: $pilihan_d_posttest
        jawaban_benar_posttest: $jawaban_benar_posttest
      }
    ) {
      id_soal_posttest
    }
  }
`;

export const EDITmateri = gql`
  mutation MyMutation(
    $id_materi: Int!
    $judul_materi: String!
    $materi: String!
    $media_gambar: String
    $media_video: String
  ) {
    update_materi_by_pk(
      pk_columns: { id_materi: $id_materi }
      _set: {
        id_materi: $id_materi
        judul_materi: $judul_materi
        materi: $materi
        media_gambar: $media_gambar
        media_video: $media_video
      }
    ) {
      id_materi
    }
  }
`;

export const EDITpassword = gql`
  mutation MyMutation(
    $id_mahasiswa: Int!
    $password: String!
    $konfirmasi_password: String!
  ) {
    update_mahasiswa_by_pk(
      pk_columns: { id_mahasiswa: $id_mahasiswa }
      _set: {
        id_mahasiswa: $id_mahasiswa
        password: $password
        konfirmasi_password: $konfirmasi_password
      }
    ) {
      id_mahasiswa
      konfirmasi_password
      password
    }
  }
`;

export const EDITprofil = gql`
  mutation MyMutation(
    $id_mahasiswa: Int!
    $nama: String!
    $email: String!
    $jenis_kelamin: String!
    $no_telepon: String!
  ) {
    update_mahasiswa_by_pk(
      pk_columns: { id_mahasiswa: $id_mahasiswa }
      _set: {
        id_mahasiswa: $id_mahasiswa
        nama: $nama
        email: $email
        jenis_kelamin: $jenis_kelamin
        no_telepon: $no_telepon
      }
    ) {
      id_mahasiswa
    }
  }
`;

export const EDITavatar = gql`
  mutation MyMutation($id_mahasiswa: Int!, $avatar: String!) {
    update_mahasiswa_by_pk(
      pk_columns: { id_mahasiswa: $id_mahasiswa }
      _set: { id_mahasiswa: $id_mahasiswa, avatar: $avatar }
    ) {
      id_mahasiswa
      avatar
    }
  }
`;

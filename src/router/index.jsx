import { Route, Routes } from "react-router-dom";

import {
  Register,
  Login,
  Home,
  Pembelajaran,
  Materi,
  Pretest,
  MiniQuiz,
  Posttest,
  Leaderboards,
  Riwayat,
  TentangKami,
  KebijakanPrivasiData,
  Faq,
  Profil,
  UbahPassword,
  NotFound,
} from "../pages/Mahasiswa";
import {
  LoginAdmin,
  KelolaUser,
  KelolaMateri,
  KelolaPretest,
  KelolaMiniQuiz,
  KelolaPosttest,
  TambahMateri,
  TambahPretest,
  TambahMiniquiz,
  TambahPosttest,
  EditPretest,
  EditPosttest,
  EditMateri,
  EditMiniquiz,
  KelolaSoalMiniQuiz,
  NotFoundAdmin,
} from "../pages/Admin";

import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import ProtectedRouteMahasiswa from "./ProtectedRouteMahasiswa";
import PrivateRouteMahasiswa from "./PrivateRouteMahasiswa";

export default function RouteList() {
  return (
    <Routes>
      {/* Protected Route Mahasiswa */}
      <Route element={<ProtectedRouteMahasiswa />}>
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Route>

      {/* Private Route Mahasiswa */}
      <Route element={<PrivateRouteMahasiswa />}>
        <Route path='/Pretest' element={<Pretest />} />
        <Route path='/Mini-Quiz' element={<MiniQuiz />} />
        <Route path='/Posttest' element={<Posttest />} />
        <Route path='/Leaderboards' element={<Leaderboards />} />
        <Route path='/Riwayat' element={<Riwayat />} />
        <Route path='/Profil' element={<Profil />} />
        <Route path='/Ubah-Password' element={<UbahPassword />} />
        <Route path='/Pembelajaran' element={<Pembelajaran />} />
        <Route path='/Materi/:id_materi' element={<Materi />} />
        <Route path='/Materi/miniquiz/:id_materi' element={<MiniQuiz />} />
      </Route>

      {/* Non Protected or privated route */}
      <Route path='/' element={<Home />} />
      <Route path='/Tentang-Kami' element={<TentangKami />} />
      <Route
        path='/Kebijakan-Privasi-Data'
        element={<KebijakanPrivasiData />}
      />
      <Route path='/FAQ' element={<Faq />} />

      {/* Protected Route Admin */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route path='/admin/Login' element={<LoginAdmin />} />
      </Route>

      {/* Private Route Admin */}
      <Route element={<PrivateRouteAdmin />}>
        <Route path='/admin/Kelola-User' element={<KelolaUser />} />
        <Route path='/admin/Kelola-Materi' element={<KelolaMateri />} />
        <Route path='/admin/Kelola-Pretest' element={<KelolaPretest />} />
        <Route path='/admin/Kelola-Posttest' element={<KelolaPosttest />} />
        <Route path='/admin/Kelola-MiniQuiz' element={<KelolaMiniQuiz />} />
        <Route
          path='/admin/Kelola-MiniQuiz/:id_materi'
          element={<KelolaSoalMiniQuiz />}
        />
        <Route path='/admin/Tambah-Materi' element={<TambahMateri />} />
        <Route path='/admin/Tambah-Pretest' element={<TambahPretest />} />
        <Route
          path='/admin/Tambah-Miniquiz/:id_materi'
          element={<TambahMiniquiz />}
        />
        <Route path='/admin/Tambah-Posttest/' element={<TambahPosttest />} />
        <Route
          path='/admin/Edit-Pretest/:id_soal_pretest'
          element={<EditPretest />}
        />
        <Route
          path='/admin/Edit-Posttest/:id_soal_posttest'
          element={<EditPosttest />}
        />
        <Route path='/admin/Edit-Materi/:id_materi' element={<EditMateri />} />
        <Route
          path='/admin/Edit-Miniquiz/:id_soal_miniquiz'
          element={<EditMiniquiz />}
        />
      </Route>

      {/* Not found route */}
      <Route path='*' element={<NotFound />} />
      <Route path='/admin/*' element={<NotFoundAdmin />} />
    </Routes>
  );
}

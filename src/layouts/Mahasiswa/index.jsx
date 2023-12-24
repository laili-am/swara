import { Navbar } from "../../components";
import { Footer } from "../../components";

export default function LayoutMahasiswa(props) {
  return (
    <>
      <Navbar auth={props.auth} />
      <main className={props.padding === false ? "layout" : "layout-padding"}>
        {props.children}
      </main>
      <Footer />
    </>
  );
}

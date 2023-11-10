import Styles from "./leftBar.module.css";
//
import { Link, useLocation } from "react-router-dom";
//
import PostFilters from "../Filters/PostsFilters/PostsFilters";
import ForumFilters from "../Filters/ForumFilters/ForumFilters";
import Orderings from "../Orderings/Orderings";

export default function LeftBar() {
  const { pathname } = useLocation();

  //////////////////////////////////////////////////////

  return (
    <div className={Styles.LeftBar}>
      <div className={Styles.LeftBar__Buttons}>
        <Link
          to="/"
          className={Styles.button}
          id={pathname === "/" ? Styles.active : ""}
        >
          PUBLICACIÓNES Y AVISOS
        </Link>
        <Link
          to="/foro"
          className={Styles.button}
          id={pathname === "/foro" ? Styles.active : ""}
        >
          FORO
        </Link>
      </div>

      <div className={Styles.LeftBar__Buttons}>
        {pathname === "/foro" ? (
          <Link to="/foro/crear" className={Styles.button}>
            CREAR COMENTARIO O PREGUNTA
          </Link>
        ) : (
          <Link to="/formulario" className={Styles.button}>
            CREAR AVISO O PUBLICACIÓN
          </Link>
        )}
      </div>

      {pathname === "/" ? <PostFilters /> : <ForumFilters />}

      {pathname === "/" ? <Orderings /> : null}
    </div>
  );
}

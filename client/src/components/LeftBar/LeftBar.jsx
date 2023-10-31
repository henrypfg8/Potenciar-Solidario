import Styles from "./leftBar.module.css";
//
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
import Select from "react-select";
//

export default function LeftBar() {
  const { pathname } = useLocation();
  const ongs = useSelector((state) => state.ongsAndCategories.ongs);

  const categoryOptions = [];
  const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
    (nombre) => ({
      label: nombre,
      value: nombre,
    })
  );
  const dateOptions = [
    { label: "Filtrar por fecha", value: "Todas las fechas" },
    { label: "Hace menos de 1 año", value: "Hace menos de 1 año" },
    { label: "Hace menos de 2 años", value: "Hace menos de 2 años" },
    { label: "Hace menos de 5 años", value: "Hace menos de 5 años" },
    { label: "Hace 5 años o mas", value: "Hace 5 años o mas" },
  ];

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

      <div className={Styles.LeftBar__Buttons} id={Styles.LeftBar__Filters}>
        <h3>Filtros de búsqueda</h3>

        {/* <Select
          className={Styles.select}
          options={categoryOptions}
          isSearchable={true}
        /> */}
        <Select
          className={Styles.select}
          options={ongOptions}
          isSearchable={true}
          menuPlacement="top"
        />
        <Select className={Styles.select} />

        <div className={Styles.Filters__date}>
          <label>
            Desde:
            <input type="date" value="2023-01-01"></input>
          </label>

          <label>
            Hasta:
            <input type="date"></input>
          </label>
        </div>
      </div>
    </div>
  );
}

import Styles from "./leftBar.module.css";
//
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";

export default function LeftBar() {
  const { pathname } = useLocation();


  const categoryOptions = [
    { label: "Filtrar por categoria", value: "Todas las categorias" },
    { label: "Donaciones ofrecidas", value: "Donaciones ofrecidas" },
    { label: "Donaciones pedidas", value: "Donaciones Pedidas" },
    { label: "Capacitaciones", value: "Capacitaciones" },
    { label: "Concursos", value: "Concursos" },
    { label: "Busquedas laborales", value: "Ofrecimientos laborales" },
    { label: "Ofrecimientos laborales", value: "Ofrecimientos laborales" },
    { label: "Emprendimientos de la ONG", value: "Emprendimientos de la ONG" },
    { label: "Eventos de la ONG", value: "Eventos de la ONG" },
    { label: "Contactos Utiles", value: "Contactos Utiles"}
  ];
  const dateOptions = [
    { label: "Filtrar por fecha", value: "Todas las fechas" },
    { label: "Hace menos de 1 año", value: "Hace menos de 1 año" },
    { label: "Hace menos de 2 años", value: "Hace menos de 2 años" },
    { label: "Hace menos de 5 años", value: "Hace menos de 5 años" },
    { label: "Hace 5 años o mas", value: "Hace 5 años o mas" },
  ];

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

        <Select
          className={Styles.select}
          defaultValue={categoryOptions[0]}
          options={categoryOptions}
          isSearchable={true}
        />
        <Select
          className={Styles.select}
          defaultValue={dateOptions[0]}
          options={dateOptions}
        />
      </div>
    </div>
  );
}

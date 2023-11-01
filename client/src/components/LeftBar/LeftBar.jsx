import Styles from "./leftBar.module.css";
//
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
//
import Select from "react-select";
//
import { getPostsByDate } from "../../Redux/actions/postsActions";

export default function LeftBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const ongs = useSelector((state) => state.ongsAndCategories.ongs);
  const categories = useSelector((state) => state.ongsAndCategories.categories);

  const [fromDate, setFromDate] = useState("");
  const [untilDate, setUntilDate] = useState("");

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));
  categoryOptions.unshift({
    label: "Todas las categorias",
    value: "Todas las categorias",
  });

  const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
    (nombre) => ({
      label: nombre,
      value: nombre,
    })
  );
  ongOptions.unshift({
    label: "Todas las organizaciones",
    value: "Todas las organizaciones",
  });

  const handleDateChange = (e) => {
    const { target: { name, value } } = e;


    if (name === 'fromDate') setFromDate(value);
    else setUntilDate(value);
  };

  useEffect(() => {
    if (fromDate !== '' && untilDate !== '') {
      let from = fromDate.split('-');
      let until = untilDate.split('');

      if (from[0] >= 2023 && until[0] > from[0]) {
        dispatch(getPostsByDate());
      }
    }
  }, [fromDate, untilDate])

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

        <Select
          className={Styles.select}
          options={categoryOptions}
          defaultValue={categoryOptions[0]}
          isSearchable={true}
          menuPlacement="top"
          placeholder="Categorias"
        />
        <Select
          className={Styles.select}
          options={ongOptions}
          defaultValue={ongOptions[0]}
          isSearchable={true}
          menuPlacement="top"
          placeholder="Organizaciones"
        />
        <Select className={Styles.select} />

        <div className={Styles.Filters__date}>
          <label>
            Desde:
            <input
              type="date"
              name="fromDate"
              value={fromDate}
              onChange={handleDateChange}
              className={Styles.dateInput}
            ></input>
          </label>

          <label>
            Hasta:
            <input
              type="date"
              name="untilDate"
              value={untilDate}
              onChange={handleDateChange}
              className={Styles.dateInput}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

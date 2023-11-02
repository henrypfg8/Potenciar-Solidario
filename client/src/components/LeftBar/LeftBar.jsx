import Styles from "./leftBar.module.css";
//
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
//
import Select from "react-select";
//
import { getPostsFiltered } from '../../Redux/actions/postsActions';

export default function LeftBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const ongs = useSelector((state) => state.ongsAndCategories.ongs);
  const categories = useSelector((state) => state.ongsAndCategories.categories);
  const [ filters, setFilters ] = useState({
    category: '',
    ong: '',
    fromDate: '',
    untilDate: ''
  });

  const handleFilters = (e) => {
    const { name, value } = e;
    const filtersCOPY = {...filters}
    filtersCOPY[name] = value;

    dispatch(getPostsFiltered(filtersCOPY));

    setFilters(filtersCOPY);
  }
  const handleDateFilters = (e) => {
    const { name, value } = e.target;
    const filtersCOPY = {...filters};
    
    filtersCOPY[name] = value;

    if (value > '2023-01-01') dispatch(getPostsFiltered(filtersCOPY))

    setFilters(filtersCOPY);
    
  }
 
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
    name: 'category'
  }));
  categoryOptions.unshift({
    label: "Todas las categorias",
    value: "",
    name: 'category'
  });

  const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
    (nombre) => ({
      label: nombre,
      value: nombre,
      name: 'ong'
    })
  );
  ongOptions.unshift({
    label: "Todas las organizaciones",
    value: "",
    name: 'ong'
  });


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
          onChange={handleFilters}
        />
        <Select
          className={Styles.select}
          options={ongOptions}
          defaultValue={ongOptions[0]}
          isSearchable={true}
          menuPlacement="top"
          placeholder="Organizaciones"
          onChange={handleFilters}
        />
        <Select className={Styles.select} />

        <div className={Styles.Filters__date}>
          <label>
            Desde:
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleDateFilters}
              className={Styles.dateInput}
            ></input>
          </label>

          <label>
            Hasta:
            <input
              type="date"
              name="untilDate"
              value={filters.untilDate}
              onChange={handleDateFilters}
              className={Styles.dateInput}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

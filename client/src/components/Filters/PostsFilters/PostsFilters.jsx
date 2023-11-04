import Styles from "./postFilters.module.css";
//
import Select from "react-select";
//
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//
import {
  getPostsFiltered,
  setPostsFilters,
} from "../../../Redux/actions/postsActions";
//
import Posts_DateFilters from './Posts_DateFilters/Posts_DateFilters';

export default function PostFilters() {
  const dispatch = useDispatch();

  const ongs = useSelector((state) => state.ongsAndCategories.ongs);
  const categories = useSelector((state) => state.ongsAndCategories.categories);

  const filters = useSelector((state) => state.posts.postsFilters);
  const [filtersLOCAL, setFiltersLOCAL] = useState({
    category: "",
    ong: "",
    fromDate: "",
    untilDate: "",
  });

  const handleFilters = (e) => {
    const { name, value } = e;
    const filtersCOPY = { ...filters };
    filtersCOPY[name] = value;

    dispatch(getPostsFiltered(filtersCOPY));

    dispatch(setPostsFilters(filtersCOPY));

    setFiltersLOCAL(filtersCOPY);
  };
  const handleDateFilters = (e) => {
    const { name, value } = e.target;
    const filtersCOPY = { ...filters };
    filtersCOPY[name] = value;

    if (value > "2023-01-01") dispatch(getPostsFiltered(filtersCOPY));

    dispatch(setPostsFilters(filtersCOPY));

    setFiltersLOCAL(filtersCOPY);
  };

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
    name: "category",
  }));
  categoryOptions.unshift({
    label: "Todas las categorias",
    value: "",
    name: "category",
  });

  const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
    (nombre) => ({
      label: nombre,
      value: nombre,
      name: "ong",
    })
  );
  ongOptions.unshift({
    label: "Todas las organizaciones",
    value: "",
    name: "ong",
  });

  useEffect(() => {
    setFiltersLOCAL(filters);
  }, [filters]);

  return (
    <div className={Styles.LeftBar__Filters}>
      <h3>Filtros de búsqueda</h3>

      <Select
        className={Styles.select}
        options={categoryOptions}
        defaultValue={categoryOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
      />
      <Select
        className={Styles.select}
        options={ongOptions}
        defaultValue={ongOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
      />
      <Select
        className={Styles.select}
        menuPlacement="top"
        placeholder="Usuarios (todavia no estan)"
      />


     <Posts_DateFilters />
      
    </div>
  );
}

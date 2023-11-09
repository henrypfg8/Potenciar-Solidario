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
  searchPosts,
  setLoading,
  hideLoading
} from "../../../Redux/actions/postsActions";
//
import Posts_DateFilters from "./Posts_DateFilters/Posts_DateFilters";
//
import { format } from "date-fns";
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";
import axios from "axios";



export default function PostFilters() {
  const dispatch = useDispatch();
  const config = configureHeaders();
  //
  const ongs = useSelector((state) => state.ongsAndCategories.ongs);
  const categories = useSelector((state) => state.ongsAndCategories.categories);
  const searchValue = useSelector((state) => state.posts.searchValue);
  //
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

  //
  const filters = useSelector((state) => state.posts.postsFilters);
  const [filtersLOCAL, setFiltersLOCAL] = useState({
    category: "",
    ong: "",
    fromDate: "",
    untilDate: "",
  });
  //manejador de filtros de categoria y ong
  const handleFilters = (e) => {
    const { name, value } = e;
    setFiltersLOCAL({ ...filters, [name]: value });
    dispatch(setLoading());
    dispatch(setPostsFilters({ ...filters, [name]: value }));
    if (searchValue !== "") {
      const filtersToApply = { ...filters, [name]: value };
      const { category, ong, fromDate, untilDate } = filtersToApply;
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()))
    } else {
      dispatch(getPostsFiltered({ ...filters, [name]: value })).then(() => dispatch(hideLoading())); 
    }
  };
  const handleFromDate = (date) => {
    const fromDate = format(date, "yyyy-MM-dd");
    setFiltersLOCAL({ ...filters, fromDate: fromDate });
    dispatch(setPostsFilters({ ...filters, fromDate: fromDate }));
    dispatch(setLoading());

    if (searchValue !== "") {
      const { category, ong, untilDate } = { ...filters };
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()));
    } else {
      dispatch(getPostsFiltered({ ...filters, fromDate: fromDate })).then(() => dispatch(hideLoading()));
    }
  };
  const handleUntilDate = (date) => {
    const untilDate = format(date, "yyyy-MM-dd");
    setFiltersLOCAL({ ...filters, untilDate: untilDate });
    dispatch(setPostsFilters({ ...filters, untilDate: untilDate }));
    dispatch(setLoading());

    if (searchValue !== "") {
      const { category, ong, fromDate } = { ...filters };
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()));
    } else {
      dispatch(getPostsFiltered({ ...filters, untilDate: untilDate })).then(() => dispatch(hideLoading()));
    }
  };
  //

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
      {/* <Select
        className={Styles.select}
        menuPlacement="top"
        placeholder="Usuarios (todavia no estan)"
      /> */}

      <Posts_DateFilters
        handleFromDate={handleFromDate}
        handleUntilDate={handleUntilDate}
        fromDate={filtersLOCAL.fromDate}
        untilDate={filtersLOCAL.untilDate}
      />
    </div>
  );
}

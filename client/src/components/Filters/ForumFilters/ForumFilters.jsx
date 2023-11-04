import Styles from "./forumFilters.module.css";
//
import Select from "react-select";
//
import { useSelector } from "react-redux";

export default function ForumFilters() {
  const forumCategories = useSelector(
    (state) => state.ongsAndCategories.forumCategories
  );
  //
  const forumCategoriesOptions = forumCategories.map((category) => ({
    label: category.name,
    value: category.name,
  }));
  forumCategoriesOptions.unshift({
    label: "Todas las categorias",
    value: "Todas las categorias",
  });

  return (
    <div className={Styles.LeftBar__Filters}>
      <h3> Filtros de busqueda: </h3>

      <Select
        className={Styles.select}
        options={forumCategoriesOptions}
        defaultValue={forumCategoriesOptions[0]}
        isSearchable={true}
        menuPlacement="top"
      />

      <div className={Styles.Filters__date}>
        <label>
          Desde:
          <input
            type="date"
            name="fromDate"
            className={Styles.dateInput}
          ></input>
        </label>

        <label>
          Hasta:
          <input
            type="date"
            name="untilDate"
            className={Styles.dateInput}
          ></input>
        </label>
      </div>
    </div>
  );
}

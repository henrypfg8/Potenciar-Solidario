import Styles from "./forumFilters.module.css";
//
import Select from "react-select";
//
import { useSelector, useDispatch } from "react-redux";
import Forum_DateFilters from "./Forum_DateFilters/Forum_DateFilters";
import { useEffect, useState } from "react";
//
import { setQuestionsFilters, getQuestionsFiltered } from '../../../Redux/actions/questionsActions';
//
import { format } from 'date-fns';


export default function ForumFilters() {
  const dispatch = useDispatch();
  const forumCategories = useSelector(
    (state) => state.ongsAndCategories.forumCategories
  );
  
  //
  const forumCategoriesOptions = forumCategories.map((category) => ({
    label: category.name,
    value: category.name,
    name: "category",
  }));
  forumCategoriesOptions.unshift({
    label: "Todas las categorias",
    value: "",
    name: "category",
  });

  //
  const filters = useSelector((state) => state.questions.questionsFilters);
  const [filtersLOCAL, setFiltersLOCAL] = useState({
    category: "",
    fromDate: "",
    untilDate: "",
  });
  const handleFilters = (e) => {
    const { name, value } = e;
    dispatch(setQuestionsFilters({...filters, [name]: value}))
    dispatch(getQuestionsFiltered({...filters, [name]: value}))
    setFiltersLOCAL({...filters, [name]: value})
  };
  const handleFromDate = (date) => {
    const fromDate = format(date, 'yyyy-MM-dd');
    dispatch(setQuestionsFilters({...filters, fromDate: fromDate}));
    dispatch(getQuestionsFiltered({...filters, fromDate: fromDate}));
    setFiltersLOCAL({...filters, fromDate: fromDate});
  };
  const handleUntilDate = (date) => {
    const untilDate = format(date, 'yyyy-MM-dd');
    dispatch(setQuestionsFilters({...filters, untilDate: untilDate}));
    dispatch(getQuestionsFiltered({...filters, untilDate: untilDate}));
    setFiltersLOCAL({...filters, untilDate: untilDate})
  };

  //
  useEffect(() => {
    setFiltersLOCAL(filters);
  }, [filters]);

  return (
    <div className={Styles.LeftBar__Filters}>
      <h3> Filtros de busqueda: </h3>

      <Select
        className={Styles.select}
        options={forumCategoriesOptions}
        defaultValue={forumCategoriesOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
      />

      <Forum_DateFilters
        handleFromDate={handleFromDate}
        handleUntilDate={handleUntilDate}
        fromDate={filtersLOCAL.fromDate}
        untilDate={filtersLOCAL.untilDate}
      />
    </div>
  );
}

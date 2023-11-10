import Styles from "./orderings.module.css";
//
import Select from "react-select";
//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import { setOrderings } from "../../Redux/actions/postsActions";

import axios from 'axios';
import { configureHeaders } from "../../Redux/auth/configureHeaders ";

export default function Orderings() {

  const dispatch = useDispatch();
  const orderBy = useSelector((state) => state.posts.orderBy);
  const [orderByLOCAL, setOrderByLOCAL] = useState({
    value: "title",
    direction: "asc",
  });

  const options = [
    {
      label: "Fecha",
      name: "value",
      value: "date",
    },
    {
      label: "Titulo",
      name: "value",
      value: "title",
    },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target ? e.target : e;
    dispatch(
      setOrderings({
        ...orderByLOCAL,
        [name]: value,
      })
    );
  };

  useEffect(() => {
    setOrderByLOCAL(orderBy);
  }, [orderBy]);

  return (
    <div className={Styles.Orderings}>
      <h3 className={Styles.title}>Ordenar por:</h3>

      <Select
        className={Styles.Orderings__select}
        options={options}
        defaultValue={options[0]}
        menuPlacement="top"
        onChange={changeHandler}
      />

      <div className={Styles.Orderings__radioInputs}>
        <div className={Styles.RadioInputs__Option}>
          <label className={Styles.label}>Ascendente</label>
          <input
            type="radio"
            name="direction"
            value="asc"
            checked={orderByLOCAL.direction === "asc"}
            onChange={changeHandler}
          />
        </div>
        <div className={Styles.RadioInputs__Option}>
          <label className={Styles.label}>Descendente</label>
          <input
            type="radio"
            name="direction"
            value="desc"
            checked={orderByLOCAL.direction === "desc"}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
}

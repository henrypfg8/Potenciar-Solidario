import Styles from "./postsOrderings.module.css";
//
import Select from "react-select";
//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import {
  setOrderings,
  setSelectedOrderingsOption,
} from "../../../Redux/actions/postsActions";

export default function Orderings() {
  const dispatch = useDispatch();

  const options = [
    {
      label: "Fecha de inicio",
      name: "value",
      value: "date",
    },
    {
      label: "Titulo",
      name: "value",
      value: "title",
    },
    {
      label: "Fecha de subida",
      name: "value",
      value: "creationDate",
    },
  ];

  const orderBy = useSelector((state) => state.posts.orderBy);
  const [orderByLOCAL, setOrderByLOCAL] = useState({...orderBy});
  
  const selectedOrderingsOption = useSelector(state => state.posts.selectedOrderingsOption)
  const [ selectedOption, setSelectedOption ] = useState({
    
  });
  
  

  //console.log('el estado global desde el componente', selectedOrderingsOption);

  const changeHandler = (e) => {
    const { name, value, label } = e.target ? e.target : e;
    dispatch(
      setOrderings({
        ...orderByLOCAL,
        [name]: value,
      })
    );
    if (!e.target) {
      dispatch(setSelectedOrderingsOption({ label, name, value }));
      setSelectedOption({label, name, value})
      console.log("en el handler:", label, name, value);
    }
  };

  useEffect(() => {
    setOrderByLOCAL(orderBy);
  }, [orderBy]);

  useEffect(() => {
    //setSelectedOption({...selectedOrderingsOption});
    console.log('useEffect - el global', selectedOrderingsOption);
    console.log('useEffect - el local', selectedOption)
  }, [selectedOrderingsOption, selectedOption])

  return (
    <div className={Styles.Orderings}>
      <h3 className={Styles.title}>Ordenar por:</h3>

      <Select
        className={Styles.Orderings__select}
        options={options}
        defaultValue={options[0]}
        menuPlacement="top"
        onChange={changeHandler}
        value={selectedOption}
      />

      <div className={Styles.Orderings__radioInputs}>
        <div className={Styles.RadioInputs__Option}>
          <label className={Styles.label}>Ascendente</label>
          <input
            className={Styles.input}
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
            className={Styles.input}
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

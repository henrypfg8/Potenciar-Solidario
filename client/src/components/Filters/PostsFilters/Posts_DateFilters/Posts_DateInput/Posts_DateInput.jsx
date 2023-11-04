import { useState } from "react";
import { format } from "date-fns";
//
import DatePicker from "react-datepicker";
import CleanDate_Icon from '../../../../../assets/CleanDate_Icon';
//
import "react-datepicker/dist/react-datepicker.css";
import Styles from './posts_DateInput.module.css';


const DateInput = () => {
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div className={Styles.DateInput}>
      <button className={Styles.DateInput__button} onClick={handleClick} id={isOpen && Styles.active}>
        {startDate ? format(startDate, "yyyy-MM-dd") : "Seleccione una fecha"}
      </button>

      <div className={Styles.DateInput__Icon}>
        <CleanDate_Icon className={Styles.icon}/>
      </div>

      <div className={Styles.DateInput__datePicker}>
        {isOpen && (
          <DatePicker selected={startDate} onChange={handleChange} inline />
        )}
      </div>
    </div>
  );
};

export default DateInput;

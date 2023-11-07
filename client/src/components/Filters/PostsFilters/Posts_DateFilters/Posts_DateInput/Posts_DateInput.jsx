import { useState } from "react";
import { format } from "date-fns";
//
import DatePicker from "react-datepicker";
import CleanDate_Icon from "../../../../../assets/CleanDate_Icon";
//
import "react-datepicker/dist/react-datepicker.css";
import Styles from "./posts_DateInput.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import {
  setPostsFilters,
  getPostsFiltered,
} from "../../../../../Redux/actions/postsActions";

const DateInput = ({
  handleFromDate,
  handleUntilDate,
  fromDate,
  untilDate,
}) => {

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const filters = useSelector((state) => state.posts.postsFilters);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    if (handleFromDate) handleFromDate(e);
    else handleUntilDate(e);

    setIsOpen(!isOpen)
  }

  const handleReset = (e) => {
    e.preventDefault();
    if (fromDate) {
      dispatch(getPostsFiltered({ ...filters, fromDate: '' }));
      dispatch(setPostsFilters({ ...filters, fromDate: '' }));
    }
    if (untilDate) {
      dispatch(getPostsFiltered({ ...filters, untilDate: '' }));
      dispatch(setPostsFilters({ ...filters, untilDate: '' }));
    }
  };

  return (
    <div className={Styles.DateInput}>
      <button
        className={Styles.DateInput__button}
        onClick={handleClick}
        id={isOpen && Styles.active}
      >
        {fromDate
          ? format(fromDate, "dd-MM-yyyy")
          : untilDate
          ? format(untilDate, "dd-MM-yyyy")
          : "Seleccione una fecha"}
      </button>

      <div className={Styles.DateInput__Icon}>
        <CleanDate_Icon className={Styles.icon} onClick={handleReset} />
      </div>

      <div className={Styles.DateInput__datePicker}>
        {isOpen && (
          <DatePicker
            selected={fromDate || untilDate}
            onChange={handleChange}
            inline
          />
        )}
      </div>
    </div>
  );
};

export default DateInput;

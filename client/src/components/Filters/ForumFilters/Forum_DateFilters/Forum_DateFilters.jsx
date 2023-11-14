import Styles from "./forum_DateFilters.module.css";
//
import Forum_DateInput from "./Forum_DateInput/Forum_DateInput";
//
import { parse } from 'date-fns'


export default function Forum_DateFilters({
  fromDate,
  untilDate,
  handleFromDate,
  handleUntilDate,
}) {
  return (
    <div className={Styles.Filters__date}>
      <p>Desde:</p>
      <Forum_DateInput
        fromDate={
          fromDate !== "" ? parse(fromDate, "yyyy-MM-dd", new Date()) : null
        }
        handleFromDate={handleFromDate}
      />

      <p>Hasta:</p>
      <Forum_DateInput
        untilDate={
          untilDate !== "" ? parse(untilDate, "yyyy-MM-dd", new Date()) : null
        }
        handleUntilDate={handleUntilDate}
      />
    </div>
  );
}

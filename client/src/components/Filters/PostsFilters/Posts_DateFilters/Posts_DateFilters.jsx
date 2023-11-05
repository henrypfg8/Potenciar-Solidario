import Styles from "./posts_DateFilters.module.css";
//
import Posts_DateInput from "./Posts_DateInput/Posts_DateInput";
import { parse } from "date-fns";

export default function Posts_DateFilters({
  handleFromDate,
  handleUntilDate,
  fromDate,
  untilDate,
}) {
  return (
    <div className={Styles.Filters__date}>
      <p> Desde: </p>
      <Posts_DateInput
        handleFromDate={handleFromDate}
        fromDate={
          fromDate !== "" ? parse(fromDate, "yyyy-MM-dd", new Date()) : null
        }
      />

      <p>Hasta: </p>
      <Posts_DateInput
        handleUntilDate={handleUntilDate}
        untilDate={
          untilDate !== "" ? parse(untilDate, "yyyy-MM-dd", new Date()) : null
        }
      />
    </div>
  );
}

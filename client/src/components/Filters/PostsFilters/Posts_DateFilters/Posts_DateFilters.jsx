import Styles from './posts_DateFilters.module.css';
//
import Posts_DateInput from './Posts_DateInput/Posts_DateInput';

export default function Posts_DateFilters() {
  return (
    <div className={Styles.Filters__date}>
      <p> Desde: </p>
      <Posts_DateInput  />

      <p>Hasta: </p>
      <Posts_DateInput />
    </div>
  );
}

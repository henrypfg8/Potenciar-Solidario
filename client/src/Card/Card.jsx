import Styles from './card.module.css';


export default function Card ({ nombre, edad, ciudad }) {

    return (
        <div className={Styles.Card}>
            <h3>{nombre}</h3>
            <p>{edad}</p>
            <p>{ciudad}</p>
        </div>
    )

}
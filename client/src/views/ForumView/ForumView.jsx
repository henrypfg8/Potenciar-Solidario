/* eslint-disable react/prop-types */
import { Open } from '../../assets/iconsForoHome';
import LeftBar from '../../components/LeftBar/LeftBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ForumView({ datos }) {


    return (
        <div>

            <div className={style.containerCenter}>
                <LeftBar />
                <div className={style.container}>
                    <h1 style={{ marginTop: '10px' }}>Foro general</h1>
                    <SearchBar />

                    <div className={style.div}>

                        {datos && datos?.map(dato => {
                            return (
                                <div key={dato.id} className={style.contain}>

                                    <div className={style.center}>
                                        <NavLink to={`/foro/${dato.preguntas.id}`}>
                                            <h2>{dato.preguntas.titulo}</h2>
                                        </NavLink>
                                        <p>@{dato.username}</p>
                                        <p>{dato.preguntas.descripcion}</p>
                                        <div
                                            className={style.anwers}>

                                            {dato.preguntas.respuestas.length === 1 && <p><strong>{dato.preguntas.respuestas.length}</strong> respuesta</p>}
                                            {dato.preguntas.respuestas.length > 1 && <p><strong>{dato.preguntas.respuestas.length}</strong> respuestas</p>}
                                        </div>
                                    </div>
                                    <button>Ver más<Open /></button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumView;

import { useEffect, useState } from "react";
import data from "../../assets/data";
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";

function Forum(){
    const { usuarios } = data;
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        setDatos(usuarios)
    }, [usuarios])


    return(
        <div className={style.container}>
            <div className={style.header}>
                <h3 className={style.titulo}>Foro general</h3>
            <NavLink to='/foro/create'>
            <button className={style.button}>Pregunta</button>
            </NavLink>
            </div>
            <div className={style.div}>

            {datos?.map(dato => {
                return(
                    <div key={dato.id} className={style.contain}>
                
                        <div className={style.center}>
                            <NavLink to={`/foro/${dato.preguntas.id}`}>
                            <h4 className={style.title}>{dato.preguntas.titulo}</h4>
                            </NavLink>
                            <p className={style.username}>@{dato.username}</p>
                            <p className={style.descripcion}>{dato.preguntas.descripcion}</p>
                            <div 
                            className={style.anwers}>
                                
                            {dato.preguntas.respuestas.length === 1 && <p className={style.respuestas}><strong>{dato.preguntas.respuestas.length}</strong> respuesta</p>}
                            {dato.preguntas.respuestas.length > 1 && <p className={style.respuestas}><strong>{dato.preguntas.respuestas.length}</strong> respuestas</p>}
                            </div>
                        
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default Forum;
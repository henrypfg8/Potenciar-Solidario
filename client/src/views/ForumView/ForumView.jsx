/* eslint-disable react/prop-types */
import LeftBar from '../../components/LeftBar/LeftBar';
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ForumView({ datos }) {


    return(
            <div>

        <div className={style.containerCenter}>
                <LeftBar/>
        <div className={style.container}>
           <h1 style={{marginTop: '10px'}}>Foro general</h1>
            
           
            <div className={style.div}>


            {datos && datos?.map(dato => {
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
            </div>
            </div>
    )
}

export default ForumView;

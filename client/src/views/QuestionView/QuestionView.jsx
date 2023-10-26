import style from './QuestionDetail.module.css'

function QuestionView({ preguntaUsuario, respuestasUsuario }) {

    return(
        <div>
            <div>
                <h1>{preguntaUsuario.username}</h1>
               <h3>{preguntaUsuario?.preguntas.titulo}</h3>
               <strong><p>{preguntaUsuario.username}</p></strong>
               <p>{preguntaUsuario?.preguntas.descripcion}</p>
            </div>

            <div>
                {respuestasUsuario.map((respuesta, index) => {
                    return(
                        <div key={index} className={style.text}>
                            <p>{respuesta.texto}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionView;

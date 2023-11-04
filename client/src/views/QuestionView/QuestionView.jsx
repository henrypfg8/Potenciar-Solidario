    /* eslint-disable react/prop-types */
    import style from './QuestionDetail.module.css'
    import { FlechaAbajoIcon } from '../../assets/FlechaParaAbajoIcon';
    import { FlechaParaArriba } from '../../assets/FlechaParaArribaIcon';
    import {QuestionDetail} from "../../components/QuestionsDetail/QuestionDetail.jsx"
    

    function QuestionView() {
        const {
            view,
            messages,
            message,
            questionDetail,
            dateQuestion,
            answer,
            handleChange,
            handleAnswers,
            answersSubmit,
            handleSubmit,
            handleView
        } = QuestionDetail()
        return (
            <div >
                {
                    questionDetail.length !== 0 || !questionDetail ?
                        <div className={style.container}>

                            <div className={style.div1}>
                                <div >

                                    <h1>{questionDetail?.title}</h1>
                                    <div className={style.date}>
                                        <a>Fecha de publicacion: <h5>{dateQuestion}</h5></a>
                                    </div>
                                    <h3>{questionDetail?.User.name}</h3>
                                    <p>{questionDetail?.text}</p>
                                </div>
                            </div>

                            <div className={style.contain}>
                                {
                                    questionDetail?.Answers.length > 0 ?
                                        <div className={style.title}>
                                            <h2>
                                                {questionDetail?.Answers?.length > 1 ? <h2><p>{questionDetail?.Answers?.length}</p> Respuestas</h2> : <
                                                    h2><p>1</p>Respuesta</h2>}

                                            </h2>
                                        </div>
                                        :
                                        <div>
                                            <h2>No hay respuestas</h2>
                                        </div>
                                }

                                {questionDetail?.Answers?.map((respuesta, index) => {
                                    return (
                                        <div key={index} className={style.response}>

                                            <p>{respuesta.answer}</p>
                                            <h4>{respuesta.User.name}</h4>


                                            {!view[index] ? <a onClick={() => handleView(index)}>Añadir comentario<FlechaAbajoIcon /></a> : <a onClick={() => handleView(index)}>Añadir comentario<FlechaParaArriba /></a>
                                            }

                                            {view[index] && <div className={style.comment}>
                                                <ul>
                                                    {messages.map((message, index) => {
                                                        return(
                                                            <li key={index}>{message.from}:{message.body}</li>
                                                        )
                                                    } )}
                                                </ul>
                                                <p>Comentar</p>
                                                <textarea type="text" cols="6" rows="5" onChange={() => handleChange(event)} />
                                                <button onClick={() => handleSubmit(message)}>Añadir comentario</button>
                                            </div>}
                                        </div>
                                    )
                                })}
                                <div className={style.question}>
                                    <textarea type="text" rows="8" onChange={handleAnswers} />
                                    <button onClick={() => answersSubmit(answer)}>Responder</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            Cargando
                        </div>
                }
            </div>
        )
    }

    export default QuestionView;

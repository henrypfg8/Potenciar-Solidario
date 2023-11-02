/* eslint-disable react/prop-types */
import { Open } from '../../assets/iconsForoHome';
import LeftBar from '../../components/LeftBar/LeftBar';
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ForumView({questions}) {

    return (
        <div>

            <div className={style.containerCenter}>
                <LeftBar />
                <div className={style.container}>
                    <h1>Foro general</h1>
                    <div className={style.div}>

                        {questions && questions?.map( question=> {
                            return (
                                <div key={question.id} className={style.contain}>

                                    <div className={style.center}>
                                        <NavLink to={`/foro/${question.id}`}>
                                            <h1>{question.title}</h1>
                                        </NavLink>
                                        {/* <h4>@{question.username}</h4> */}
                                        <p>{question.text}</p>
                                        <div
                                            className={style.anwers}>

                                            {question.Answers.length === 1 && <p><strong>{question.Answers.length}</strong> respuesta</p>}
                                            {question.Answers.length > 1 && <p><strong>{question.Answers.length}</strong> respuestas</p>}
                                        </div>
                                    </div>
                                    <NavLink to={`/foro/${question.id}`}>

                                    <button>Ver más<Open /></button>
                                    </NavLink>
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

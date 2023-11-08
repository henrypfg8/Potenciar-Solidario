/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Open } from '../../assets/iconsForoHome';
import LeftBar from '../../components/LeftBar/LeftBar';
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ForumView({questions}) {
    let [getQuestion, setGetQuestion] = useState([]);

    useEffect(()=>{
        if(questions){
            setGetQuestion(questions)
        }
    },[questions])

    
    return (
        <div style={{minHeight:'100vh'}}>
            {
                getQuestion.length === 0
                ?
                <div className={style.containerCenter}>
                <LeftBar />
                <div>
                    <h1>
                        No hay ninguna preguntas
                    </h1>
                </div>
            </div>
            :
            <div className={style.containerCenter}>
                <LeftBar />
                <div className={style.container}>
                    <h1>Foro general</h1>
                    <div className={style.div}>
    
                        {getQuestion?.reverse().map( question=> {
                            return (
                                <div key={question.id} className={style.contain}>
    
                                    <div className={style.center}>
                                        <NavLink to={`/foro/${question.id}`}>
                                            <h1>{question.title}</h1>
                                        </NavLink>
                                        <p>{question.text}</p>
                                    </div>
                                    <br style={{border: '1px red solid'}} />
                                        {/* <NavLink to={`/foro/${question.id}`}>
                                        <button>Ver más<Open /></button>
                                        </NavLink> */}
                                        <footer
                                            className={style.anwers}>
    
                                            {question.Answers.length === 1 && <p><strong>{question.Answers.length}</strong> respuesta</p>}
                                            {question.Answers.length > 1 && <p><strong>{question.Answers.length}</strong> respuestas</p>}
                                        <p>@{question.User.name}</p>
                                        <p>Creada el dia</p>
                                        </footer>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            }
        </div>
    )
    
}

export default ForumView;

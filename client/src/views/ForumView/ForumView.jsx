/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import LeftBar from '../../components/LeftBar/LeftBar';
import style from './Foro.module.css';
import { NavLink } from "react-router-dom";
import { Oval } from 'react-loader-spinner';
import  {FluentMdl2QandA}  from '../../assets/noQuestion_Icon';

function ForumView({ questions, loading }) {
    let [getQuestion, setGetQuestion] = useState([]);
    
  const [responsiveMode, setResponsiveMode] = useState(window.innerWidth < 993);

    useEffect(() => {
        if (questions) {
            setGetQuestion(questions)
        }
    }, [questions])

    useEffect(() => {
    function handleResize(e) {
      const responsiveMode = window.innerWidth < 993;
      if (responsiveMode) {
        setResponsiveMode(true);
      } else setResponsiveMode(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className={style.containerCenter}>
                <LeftBar responsiveMode={responsiveMode} />
                {
                    loading
                    ?
                    <Oval
                        height={80}
                        width={80}
                        color="#005692"
                        wrapperStyle={{ margin: "auto auto" }}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#a4d4ff"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                    :
                    getQuestion.length === 0
                    ?
                    <div className={style.centerLoading}>
                        <h1 className={style.titleCenter}>Foro general</h1>
                        <FluentMdl2QandA className={style.loading}/>
                        <h3>No hay preguntas</h3>
                    </div>
                    :
                    <div className={style.container}>
                        <h1 className={style.titleCenter}>Foro general</h1>
                        <div className={style.div}>
                            {getQuestion?.sort((a, b) => b.id - a.id).map(question => {
                                let date = new Date(question.createdAt)
                                return (
                                    <div key={question.id} className={style.contain}>
                                        <div className={style.center}>
                                            <NavLink to={`/foro/${question.id}`}>
                                                <h1>{question.title}</h1>
                                            </NavLink>
                                            <p>{question.text}</p>
                                        </div>
                                        
                                        <footer className={style.anwers}>
                                            {question.Answers.length === 0 && <p><strong>{question.Answers.length}</strong> respuestas</p>}
                                            {question.Answers.length === 1 && <p><strong>{question.Answers.length}</strong> respuesta</p>}
                                            {question.Answers.length > 1 && <p><strong>{question.Answers.length}</strong> respuestas</p>}
                                            <p>@{question.User.name}</p>
                                            <p>{date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
                                        </footer>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForumView;

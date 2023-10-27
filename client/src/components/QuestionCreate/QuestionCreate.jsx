import { useState } from "react";
<<<<<<< Updated upstream
import style from './Question.module.css'
=======
import style from './QuestionCreate.module.css'
>>>>>>> Stashed changes

function QuestionCreate() {

    const [question, setQuetions] = useState({
        title: '',
        description: ''
    })

    const handleChange = (event) => {
        setQuetions({
            ...question,
            [event.target.name]: event.target.value
        })
    }
    console.log(question);
    return (
<<<<<<< Updated upstream
        <div className={style.contain}>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.div}>
                    <label htmlFor="title">Titulo </label>
                    <input type="text" name="title" placeholder="Titulo"/>
                </div>

                <div className={style.div}>
                    <label htmlFor="description">Descripcion</label>
                    <textarea type="text"  cols="30" rows="8" name="description" placeholder="Descripcion"></textarea>
=======
        <div>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.input}>
                    <label htmlFor="title" className={style.label}>Titulo </label>
                    <input type="text" name="title" />
                </div>

                <div className={style.input}>
                    <label htmlFor="description" className={style.label}>Descripcion</label>
                    <input type="text" name="description" />
>>>>>>> Stashed changes
                </div>
                <button type="submit">Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
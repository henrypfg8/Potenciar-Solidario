
import { useState } from "react";
import { useDispatch } from 'react-redux'
import style from './QuestionCreate.module.css'
import { createQuestion } from "../../Redux/actions";

function QuestionCreate() {
    const dispatch = useDispatch()
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

    const submitQuestion = async () => {
        event.preventDefault()
        console.log(question);
        try {
            const created = await dispatch(createQuestion(question))
            console.log(created)
        } catch (error) {
            console.log(error.message)

        }
    }
    return (
        <div className={style.contain}>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.div}>
                    <label htmlFor="title">Titulo </label>
                    <input type="text" name="title" placeholder="Titulo" />
                </div>

                <div className={style.div}>
                    <label htmlFor="description">Descripcion</label>
                    <textarea type="text" cols="30" rows="8" name="description" placeholder="Descripcion"></textarea>
                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
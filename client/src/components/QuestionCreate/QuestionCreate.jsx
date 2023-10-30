
import { useState } from "react";
import {useDispatch} from 'react-redux'
import style from './QuestionCreate.module.css'

function QuestionCreate() {
// const dispatch = useDispath()
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

    // const submitQuestion = async() => {
    //     try {
    //         dispatch()
    //     } catch (error) {
            
    //     }

    // }
    return (
    <div className={style.contain}>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.div}>
                    <label htmlFor="title">Titulo </label>
                    <input type="text" name="title" placeholder="Titulo"/>
                </div>

                <div className={style.div}>
                    <label htmlFor="description">Descripcion</label>
                    <textarea type="text"  cols="30" rows="8" name="description" placeholder="Descripcion"></textarea>
                </div>
                <button type="submit">Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
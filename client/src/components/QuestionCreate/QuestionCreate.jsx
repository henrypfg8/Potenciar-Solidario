/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import style from './QuestionCreate.module.css'
import { createQuestion } from "../../Redux/actions/questionsActions";
import validationQuestion from "./QuestionValidate";
import Swal from "sweetalert2";
import { getCategories } from "../../Redux/actions/categoriesActions";
function QuestionCreate() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.ongsAndCategories.categories)

    console.log(categories);

    useEffect(() => {
        dispatch(getCategories())
    },[])


    const [errores, setErrores] = useState({
        title: '',
        text: ''
    })
    const [question, setQuetions] = useState({
        title: '',
        text: ''
    })
    const [firstSubmit, setFirstSubmit] = useState(false)

    const handleChange = (event) => {
        setQuetions({
            ...question,
            [event.target.name]: event.target.value
        })
        if (firstSubmit) {
            setErrores(validationQuestion({
                ...question,
                [event.target.name]: event.target.value
            }))
        }
    }

    const submitQuestion = async (event) => {
        event.preventDefault()
        setFirstSubmit(true)
        const errores = validationQuestion(question);
        setErrores(errores);
        try {
            if(Object.keys(errores).length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Intente de nuevo',
                    text: 'Debe rellenar todos los campos!',
                })
            }else{
                const created = await dispatch(createQuestion(question))
                if(created){

                    Swal.fire({
                        icon: 'success',
                        title: 'Pregunta creada con exito',
                    })
                }
            }
            
        } catch (error) {
            throw new Error(error.message)
            
        }
        
    }


    return (
        <div className={style.contain}>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.div}>
                    <label htmlFor="title">Titulo </label>
                    
                    <div  className={style.errores}>

                    {errores.title && <p>{errores.title}</p>}
                    </div>

                    {
                        errores.title ? 
                        <input type="text" name="title" placeholder="Titulo" style={{background:'rgba(255, 0, 0, 0.226)'}}/> :
                        <input type="text" name="title" placeholder="Titulo" />

                    }
                    
                </div>

                <div className={style.div}>
                    <label htmlFor="text">Descripcion</label>
                    <div  className={style.errores}>

                    {errores.text && <p>{errores.text}</p>}
                    </div>
                    {
                        errores.text ? 
                        <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{background:'rgba(255, 0, 0, 0.226)'}}/> 
                        :
                        <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion"/>

                    }
                    
                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
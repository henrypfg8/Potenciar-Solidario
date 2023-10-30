
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import style from './QuestionCreate.module.css'
import { createQuestion } from "../../Redux/actions";
import validationQuestion from "./QuestionValidate";
import Swal from "sweetalert2";

function QuestionCreate() {
    const dispatch = useDispatch()
    const [errores, setErrores] = useState({
        title: '',
        description: ''
    })
    const [question, setQuetions] = useState({
        title: '',
        description: ''
    })

    const handleChange = (event) => {
        setErrores(validationQuestion({
            ...question,
            [event.target.name]: event.target.value
        }))
        setQuetions({
            ...question,
            [event.target.name]: event.target.value
        })
    }

    const submitQuestion = async () => {
        event.preventDefault()
        console.log(question);
        if(Object.keys(errores).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Intente de nuevo',
                text: 'Debe rellenar todos los campos!',
            })
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Pregunta creada con exito',
                // text: '!',
            })

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
                    <label htmlFor="description">Descripcion</label>
                    <div  className={style.errores}>

                    {errores.description && <p>{errores.description}</p>}
                    </div>
                    {
                        errores.description ? 
                        <textarea type="text" cols="30" rows="8" name="description" placeholder="Descripcion" style={{background:'rgba(255, 0, 0, 0.226)'}}/> 
                        :
                        <textarea type="text" cols="30" rows="8" name="description" placeholder="Descripcion"/>

                    }
                    
                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
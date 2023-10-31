/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import style from './QuestionCreate.module.css'
import { createQuestion } from "../../Redux/actions/questionsActions";
import validationQuestion from "./QuestionValidate";
import Swal from "sweetalert2";
import { getCategories } from "../../Redux/actions/categoriesActions";
import Select from "react-select";
function QuestionCreate() {
    const dispatch = useDispatch()
    //Obtener las categorias para renderizar un select
    const categories = useSelector(state => state.ongsAndCategories.categories)

    //hacerle un destructuring al array del categorias para obtener sus categorias para renderizar los select
    const categoryOptions = [{ label: "Selecciona una categoría", value: false}, ...categories.map(cat => ({ label: cat.name, value: cat.id }))];


    useEffect(() => {
        dispatch(getCategories())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [errores, setErrores] = useState({
        title: '',
        text: '',
        categories: ''
    })
    const [question, setQuetions] = useState({
        title: '',
        text: '',
        categories: ''
    })
    const [firstSubmit, setFirstSubmit] = useState(false)

    console.log(errores);
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
    const handleCategoryChange = (selectedOption) => {
        setQuetions({
            ...question,
            categories: selectedOption.value
        })
        if (firstSubmit) {
            setErrores(validationQuestion({
                ...question,
                categories: selectedOption.value
            }))
        }
    }
    const colourStyles = {
        control: styles => ({
          ...styles,
          borderColor: errores.categories || errores.categories === null ? 'red' : '#ddd',
          boxShadow: errores.categories || errores.categories === null ? '0 0 0 1px red' : null,
        }),
      };
    const submitQuestion = async (event) => {
        event.preventDefault()
        setFirstSubmit(true)
        const errores = validationQuestion(question);
        setErrores(errores);
        try {
            if (Object.keys(errores).length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Intente de nuevo',
                    text: 'Debe rellenar todos los campos!',
                })
            } else {
                const created = await dispatch(createQuestion(question))
                if (created) {

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
                    <label htmlFor="title">Asunto</label>

                    <div className={style.errores}>

                        {errores.title && <p>{errores.title}</p>}
                    </div>

                    {
                        errores.title ?
                            <input type="text" name="title" placeholder="Asunto" style={{ background: 'rgba(255, 0, 0, 0.226)' }} /> :
                            <input type="text" name="title" placeholder="Asunto" />

                    }

                </div>
                <div className={style.div}>
                    <label>Categoria</label>
                    <Select
                        
    options={categoryOptions} 
    className={style.select}
    isSearchable={true} 
    name="categories" 
    onChange={handleCategoryChange} 
    styles={colourStyles}
    value={categoryOptions.find(option => option.value === question.categories)}
/>
                </div>

                <div className={style.div}>
                    <label htmlFor="text">Descripcion</label>
                    <div className={style.errores}>

                        {errores.text && <p>{errores.text}</p>}
                    </div>
                    {
                        errores.text ?
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{ background: 'rgba(255, 0, 0, 0.226)' }} />
                            :
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" />

                    }

                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
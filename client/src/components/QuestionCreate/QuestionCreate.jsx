/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createQuestion } from "../../Redux/actions/questionsActions";
import validationQuestion from "./QuestionValidate";
import Swal from "sweetalert2";
import { getCategories } from "../../Redux/actions/categoriesActions";

export function useQuestionCreate() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.ongsAndCategories.categories)
    const categoryOptions = [{ label: "Selecciona una categoría", value: false }, ...categories.map(cat => ({ label: cat.name, value: cat.id }))];
    const {user, userProfile} = useSelector(state => state.auth);

  

   console.log(userProfile);
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const [errores, setErrores] = useState({
        title: '',
        text: '',
        categoryId: ''
    })
    const [question, setQuetions] = useState({
        title: '',
        text: '',
        categoryId: '',
        userId: userProfile.id
    })
    const [disableButton, setDisableButton] = useState(false)
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
    const handleCategoryChange = (selectedOption) => {
        setQuetions({
            ...question,
            categoryId: selectedOption.value
        })
        if (firstSubmit) {
            setErrores(validationQuestion({
                ...question,
                categoryId: selectedOption.value
            }))
        }
    }
    const colourStyles = {
        control: styles => ({
            ...styles,
            borderColor: errores.categoryId || errores.categoryId === null ? 'red' : 'rgb(73, 255, 73)',
            boxShadow: errores.categoryId || errores.categoryId === null ? '0 0 0 1px red' : '0 0 0 1px rgb(73, 255, 73)',
        }),
    };
    const submitQuestion = async (event) => {
        console.log(question);
        event.preventDefault()
        setDisableButton(true)
        setFirstSubmit(true)
        const errores = validationQuestion(question);
        setErrores(errores);
        try {
            if (Object.keys(errores).length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Intente de nuevo',
                    text: 'Debe rellenar todos los campos!',
                }).then(() => {
                    setDisableButton(false) // Reactiva el botón después de cerrar la alerta
                })
            } else {
                const created = await dispatch(createQuestion(question))
                console.log(created);
                setTimeout(() => {
                    if (created) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Pregunta creada con exito',
                        }).then(() => {
                            setDisableButton(false) // Reactiva el botón después de cerrar la alerta
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error 404',
                            text: 'Intente nuevamente o contacte a soporte!',
                        }).then(() => {
                            setDisableButton(false) // Reactiva el botón después de cerrar la alerta
                        })
                    }
                }, 1000);
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    

    return { disableButton,firstSubmit, question,categoryOptions, errores, handleChange, handleCategoryChange, colourStyles, submitQuestion };
}

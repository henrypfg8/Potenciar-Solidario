/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createQuestion, getQuestions } from "../../Redux/actions/questionsActions";
import validationQuestion from "./QuestionValidate";
import Swal from "sweetalert2";
import swal from 'sweetalert';
import { getForumCategories } from "../../Redux/actions/categoriesActions"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function useQuestionCreate() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.ongsAndCategories.forumCategories)
    console.log(categories);
    const categoryOptions = [{ label: "Selecciona una categoría", value: false }, ...categories.map(cat => ({ label: cat.name, value: cat.id }))];
    const [userId, setUserId] = useState('')
    const { isAuthenticated, token } = useSelector(state => state.auth)


    const [errores, setErrores] = useState({
        title: '',
        text: '',
        categoryId: ''
    })
    const [question, setQuetions] = useState({
        userId,
        title: '',
        text: '',
        categoryId: '',

    })
    const reset = () => {
        setQuetions({
            userId,
            title: '',
            text: '',
            categoryId: ''
        })
    }
    const navigate = useNavigate()


    useEffect(() => {
        if (!token || !isAuthenticated) {
            swal("Necesita loguearse para poder realizar una pregunta")
                .then((value) => {
                    navigate('/login')
                });
        }
        if (token) {
            const decodify = jwtDecode(token)
            if (decodify) {
                setUserId(decodify.id)
                setQuetions(prevState => ({ ...prevState, userId: decodify.id }))
            }
        }
    }, [])
    useEffect(() => {
        dispatch(getForumCategories())
    }, [])

    const [disableButton, setDisableButton] = useState(false)
    const [firstSubmit, setFirstSubmit] = useState(false)

    const handleChange = (event) => {
        setQuetions({
            ...question,
            userId,
            [event.target.name]: event.target.value
        })
        if (firstSubmit) {
            setErrores(validationQuestion({
                ...question,
                userId,
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
        event.preventDefault()
        setDisableButton(true)
        setFirstSubmit(true)
        const errores = validationQuestion(question);
        setErrores(errores);
        try {
            // if (Object.keys(errores).length > 0) {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Intente de nuevo',
            //         text: 'Debe rellenar todos los campos!',
            //     }).then(() => {
            //         setDisableButton(false) 
            //     })
            // } else {
            dispatch(createQuestion(question)).then(() => {
                dispatch(getQuestions())
                Swal.fire({
                    icon: 'succes',
                    title: 'Pregunta creada con exito!',
                }).then(() => {
                    setDisableButton(false)
                    navigate('/foro')
                })

            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Intente de nuevo',
                    text: 'Debe rellenar todos los campos!',
                }).then(() => {
                    setDisableButton(false)
                })

            })


            // }
        } catch (error) {
            throw new Error(error.message)
        }
    }


    return { disableButton, firstSubmit, question, categoryOptions, errores, handleChange, handleCategoryChange, colourStyles, submitQuestion };
}

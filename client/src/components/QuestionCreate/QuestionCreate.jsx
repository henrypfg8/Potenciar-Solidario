import { useState } from "react";

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
        <div>
            <form action="" onChange={handleChange}>
                <div>
                    <label htmlFor="" >Titulo </label>
                    <input type="text" name="title" />
                </div>

                <div>
                    <label htmlFor="" >Descripcion</label>
                    <input type="text" name="description" />
                </div>
                <button type="submit">Enviar pregunta</button>
            </form>
        </div>
    )

}
export default QuestionCreate;
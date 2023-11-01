import style from './QuestionCreate.module.css'
import Select from "react-select";
import { useQuestionCreate } from '../../components/QuestionCreate/QuestionCreate';

function QuestionCreateView() {
    const { firstSubmit, question, categoryOptions, errores, handleChange, handleCategoryChange, colourStyles, submitQuestion } = useQuestionCreate();
console.log(question);
    return (
        <div className={style.contain}>
            <form action="" onChange={handleChange} className={style.form}>
                <div className={style.div}>
                    <label htmlFor="title">Asunto <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.title && <p>{errores.title}</p>}
                    </div>
                    {
                        errores.title ?
                            <input type="text" name="title" placeholder="Asunto" style={{ boxShadow: firstSubmit ? '0 0 0 1px red': '', border: firstSubmit ? 'red 1px solid' : ''}} /> :
                            <input type="text" name="title" placeholder="Asunto" style={{ boxShadow: firstSubmit ? '0 0 0 1px rgb(73, 255, 73)' : '', border: firstSubmit ? '1px rgb(73, 255, 73) solid' : '' }} />
                    }
                </div>
                <div className={style.div}>
                    <label>Categoria <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.categories && <p>{errores.categories}</p>}
                    </div>
                    <Select
                        options={categoryOptions}
                        className={style.select}
                        isSearchable={true}
                        name="categories"
                        onChange={handleCategoryChange}
                        styles={firstSubmit ? colourStyles : ''}
                        value={question  && categoryOptions.find(option => option.value === question.categories)}
                    />
                </div>
                <div className={style.div}>
                    <label htmlFor="text">Descripcion <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.text && <p>{errores.text}</p>}
                    </div>
                    {
                        errores.text ?
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{ boxShadow: firstSubmit ? '0 0 0 1px red' : '', border: firstSubmit ? 'red 1px solid' : '' }} /> :
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{ boxShadow:  firstSubmit ? '0 0 0 1px rgb(73, 255, 73)': '', border: firstSubmit ? '1px rgb(73, 255, 73) solid' : ''}}/>
                    }
                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )
}

export default QuestionCreateView;

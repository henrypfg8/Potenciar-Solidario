import style from './QuestionCreate.module.css'
import Select from "react-select";
import { useQuestionCreate } from '../../components/QuestionCreate/QuestionCreate';

function QuestionCreateView() {
    const { question, categoryOptions, errores, handleChange, handleCategoryChange, colourStyles, submitQuestion } = useQuestionCreate();

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
                            <input type="text" name="title" placeholder="Asunto" style={{ boxShadow: '0 0 0 1px red', border: 'red 1px solid' }} /> :
                            <input type="text" name="title" placeholder="Asunto" style={{ boxShadow: '0 0 0 1px rgb(73, 255, 73)', border: '1px rgb(73, 255, 73) solid' }} />
                    }
                </div>
                <div className={style.div}>
                    <label>Categoria</label>
                    <div className={style.errores}>
                        {errores.categories && <p>{errores.categories}</p>}
                    </div>
                    <Select
                        options={categoryOptions}
                        className={style.select}
                        isSearchable={true}
                        name="categories"
                        onChange={handleCategoryChange}
                        styles={colourStyles}
                        value={question  && categoryOptions.find(option => option.value === question.categories)}
                    />
                </div>
                <div className={style.div}>
                    <label htmlFor="text">Descripcion</label>
                    <div className={style.errores}>
                        {errores.text && <p>{errores.text}</p>}
                    </div>
                    {
                        errores.text ?
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{ boxShadow: '0 0 0 1px red', border: 'red 1px solid' }} /> :
                            <textarea type="text" cols="30" rows="8" name="text" placeholder="Descripcion" style={{ boxShadow: '0 0 0 1px rgb(73, 255, 73)', border: '1px rgb(73, 255, 73) solid' }}/>
                    }
                </div>
                <button type="submit" onClick={submitQuestion}>Enviar pregunta</button>
            </form>
        </div>
    )
}

export default QuestionCreateView;

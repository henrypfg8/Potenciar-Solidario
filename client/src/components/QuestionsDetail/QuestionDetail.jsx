import { useParams } from "react-router-dom";
import data from '../../assets/data'
import QuestionView from "../../views/QuestionView/QuestionView";

function QuestionDetail(){
    const { id } = useParams();
    const { usuarios, respuestas } = data;
    
    const preguntaUsuario = usuarios.find(usuario => usuario.id === Number(id))
    const arrayRespuestas = preguntaUsuario?.preguntas.respuestas
    
    const respuestasUsuario = respuestas.filter(respuesta => arrayRespuestas.includes(respuesta.id))

    return <QuestionView preguntaUsuario={preguntaUsuario} respuestasUsuario={respuestasUsuario} />
}

export default QuestionDetail;

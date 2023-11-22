export default function validationAnswer(input){
    let errores = {};
    if(input.answer === ''){
        errores.answer = 'Para enviar una respuesta no puede estar vacia'
    }
    if(input.answer.length < 20){
        errores.answer = 'La respuesta debe de tener minimo 20 caracteres'
    }
    if(input.answer.length > 700){
        errores.answer = 'La respuesta no puede tener mas de 700 caracteres'
    }
    return errores;
}
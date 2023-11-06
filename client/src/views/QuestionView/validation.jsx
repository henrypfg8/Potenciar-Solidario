export default function validation(input){
    let errores = {};
    if(!input.answer){
        errores.answer = 'Para enviar una respuesta no puede estar vacia'
    }
    if(input.answer.length < 20){
        errores.answer = 'La respuesta debe de tener minimo 20 caracteres'
    }
    return errores;
}
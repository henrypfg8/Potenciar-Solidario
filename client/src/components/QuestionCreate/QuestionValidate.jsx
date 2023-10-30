
export default function validationQuestion(input) {
    let errores = {};

if(input.title.length < 10){
    errores.title = 'El titulo debe de tener al menos 10 caracteres'
}
if(!input.description){
    errores.description = 'Debe de tener una descripcion'
}
return errores;
}
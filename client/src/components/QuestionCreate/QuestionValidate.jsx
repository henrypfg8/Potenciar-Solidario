
export default function validationQuestion(input) {
    let errores = {};
if(!input.title){
    errores.title = 'Debe de tener un titulo como obligatorio'
}
if(input.title.length < 10){
    errores.title = 'El titulo debe de tener al menos 10 caracteres'
}
if(!input.text){
    errores.text = 'Debe de tener una descripcion'
}
if(input.text.length < 10){
    errores.text = 'La descripcion debe de ser minimo 10 caracteres'
}
if(!input.categories){
    errores.categories = 'Debe de seleccionar una categoria'
}
return errores;
}
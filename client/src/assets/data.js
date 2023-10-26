const usuarios = [
    {
        id: 1,
        nombre: "Angel",
        username: "angel",
        correo: "ejemplo@gmail.com",
        preguntas: 
            {
                id: 1,
                titulo: "Perdi mi base de datos",
                descripcion: "Hola, ayer estaba usando mi base de datos y sin querer la perdí, alguien sabe como la recupero?",
                respuestas: [4,7,2,1]
            }
        
    },
    {
        id: 2,
        nombre: "Gabriel",
        username: "gabriel",
        correo: "gabriel@gmail.com",
        preguntas:
            {
                id: 2,
                titulo: "Mi visual estudio no quiere abrir",
                descripcion: "Desde el dia de ayer al actualizar mi visual studio no ha querido abrir, ya he probado instalando y desintalando y todavia nada",
                respuestas: [5,8,6,3]
            }
        
    },
    // Agregando más usuarios
    {
        id: 3,
        nombre: "Carlos",
        username: "carlos",
        correo: "carlos@gmail.com",
        preguntas:
            {
                id: 3,
                titulo: "Problemas con React",
                descripcion: "Estoy teniendo problemas para renderizar un componente en React. ¿Alguien puede ayudarme?",
                respuestas: [9]
            }
        
    },
    {
        id: 4,
        nombre: "Maria",
        username: "maria",
        correo: "maria@gmail.com",
        preguntas:
            {
                id: 4,
                titulo: "Error en Python",
                descripcion: "Tengo un error de sintaxis en mi código Python pero no puedo encontrarlo. ¿Alguien puede ayudarme?",
                respuestas: [10]
            }
        
    }
];

const respuestas = [
    {id: 1, texto: "Quizas la borraste sin querer"},
    {id: 2, texto: "Que comandos estas usando para ver los datos de ella?"},
    {id: 3, texto: "Intentaste borrar todos lo datos?"},
    {id: 4, texto: "Intenta crear una nueva base de datos ya que si la borraste no la podras recuperar"},
    {id: 5, texto: "Intenta descargar de nuevo el instalador e instalalo de nuevo, quizas ahi este el error"},
    {id: 6, texto: "Borra todos los datos del visual, quizas funcione"},
    {id: 7, texto: "Crea una nueva base de datos, lo mas probable es que haya sido eliminada sin querer"},
    {id: 8, texto: "Intenta borrar la actulizacion que le instalaste"},
    // Agregando más respuestas
    {id: 9, texto:"Asegúrate de que estás exportando e importando correctamente el componente."},
    {id: 10,texto:"Podrías usar un linter para ayudarte a encontrar errores de sintaxis en tu código."}
];

export default {usuarios, respuestas};

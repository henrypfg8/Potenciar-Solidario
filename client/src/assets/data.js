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
        
    },
    {
        id: 5,
        nombre: "Jose",
        username: "jose",
        correo: "jose@gmail.com",
        preguntas:
            {
                id: 5,
                titulo: "Error en JavaScript",
                descripcion: "No puedo entender por qué mi función no está funcionando. ¿Alguien puede ayudarme?",
                respuestas: [11, 12]
            }
        
    },
    {
        id: 6,
        nombre: "Ana",
        username: "ana",
        correo: "ana@gmail.com",
        preguntas:
            {
                id: 6,
                titulo: "Problemas con CSS",
                descripcion: "Mi página web no se ve bien en móviles. ¿Cómo puedo hacerla responsive?",
                respuestas: [13, 14]
            }
        
    }
];

const usuariosRespuestas = [
    {
        id: 1,
        username: "usuario1",
        correo: "usuario1@gmail.com"
    },
    {
        id: 2,
        username: "usuario2",
        correo: "usuario2@gmail.com"
    },
    {
        id: 3,
        username: "usuario3",
        correo: "usuario3@gmail.com"
    },
    {
        id: 4,
        username: "usuario4",
        correo: "usuario4@gmail.com"
    },
    {
        id: 5,
        username: "usuario5",
        correo: "usuario5@gmail.com"
    },
    {
        id: 6,
        username: "usuario6",
        correo: "usuario6@gmail.com"
    }
];

const respuestas = [
    {id: 1, texto:"Quizas la borraste sin querer", usuarioId :1},
    {id: 2, texto:"Que comandos estas usando para ver los datos de ella?", usuarioId :1},
    {id: 3, texto:"Intentaste borrar todos lo datos?", usuarioId :2},
    {id: 4, texto:"Intenta crear una nueva base de datos ya que si la borraste no la podras recuperar", usuarioId :1},
    {id: 5, texto:"Intenta descargar de nuevo el instalador e instalalo de nuevo, quizas ahi este el error", usuarioId :2},
    {id: 6, texto:"Borra todos los datos del visual, quizas funcione", usuarioId :2},
    {id: 7, texto:"Crea una nueva base de datos, lo mas probable es que haya sido eliminada sin querer", usuarioId :1},
    {id: 8, texto:"Intenta borrar la actulizacion que le instalaste", usuarioId :2},
    {id: 9, texto:"Asegúrate de que estás exportando e importando correctamente el componente.", usuarioId :3},
    {id: 10,texto:"Podrías usar un linter para ayudarte a encontrar errores de sintaxis en tu código.", usuarioId :4},
    {id: 11,texto:"Asegúrate de que estás llamando a la función correctamente.", usuarioId :5},
    {id: 12,texto:"Podrías usar la consola para depurar tu código.", usuarioId :5},
    {id: 13,texto:"Prueba usando media queries en tu CSS.", usuarioId :6},
    {id: 14,texto:"Asegúrate de que todos tus elementos son flexibles y se pueden adaptar a diferentes tamaños de pantalla.", usuarioId :6}
];

export default {usuarios, respuestas, usuariosRespuestas};

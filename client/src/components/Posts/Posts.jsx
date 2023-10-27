import Styles from './posts.module.css';
//
import Post from '../Post/Post';
import SearchBar from '../SearchBar/SearchBar';


export default function Posts () {

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];
  const publications = [
    {
      title: "Adopción de cachorros",
      ong: "Sociedad Protectora de Animales",
      category: "Animales",
      description: "Tenemos cachorros de diferentes razas buscando un hogar amoroso."
    },
    {
      title: "Limpieza de Playa",
      ong: "Green Earth",
      category: "Medio Ambiente",
      description: "Únete a nuestra iniciativa de limpieza de playa el próximo fin de semana."
    },
    {
      title: "Donación de sangre",
      ong: "Cruz Roja",
      category: "Salud",
      description: "Necesitamos donantes de sangre de tipo O- para pacientes en el hospital local."
    },
    {
      title: "Clases de matemáticas gratis",
      ong: "Educación para Todos",
      category: "Educación",
      description: "Ofrecemos clases de matemáticas gratuitas para estudiantes de secundaria y preparatoria."
    },
    {
      title: "Campaña de vacunación",
      ong: "Clínica de Salud Comunitaria",
      category: "Salud",
      description: "La clínica local llevará a cabo una campaña de vacunación contra la gripe esta semana."
    },
    {
      title: "Exposición de arte contemporáneo",
      ong: "Asociación de Artistas Locales",
      category: "Arte",
      description: "Ven a nuestra exposición de arte con obras de artistas locales. ¡Entrada gratuita!"
    }
  ];
 


  return (
    <div className={Styles.Posts}>

      <h1 style={{marginTop: '10px'}}>Publicaciones de la cartelera</h1>

      <SearchBar />

      <div className={Styles.Cards}>
        {
          publications?.map(({ title, ong, category, description }) => (
            <Post 
              key={title}
              ong={ong}
              category={category}
              description={description}
            />
          ))
        }
      </div>
      
    </div>
  )
    
}

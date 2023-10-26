/* eslint-disable react/prop-types */
import {useSelector, useDispatch} from 'react-redux'
import { createPost } from '../../Redux/actions';

const Form = ({ setPublication, pulication }) => {
    // const dispatch = useDispatch();
    // const state = useSelector(state => state);
    // console.log(state); 
    // Enviar los datos del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
 
       setPublication({
        ...pulication,
        title: '',
        category: '',
        description: '',
        startDate: '',
        endDate: '',
        image: '',
        creationDate: '',
        imagePreview: null,
        contact: '',
        status: false,
        organization: '',
        linkInscription: '',
        url: '',
       }) // Limpiar el formulario
       //enviar los datos al servidor
    };
   // dispatch(createPost(pulication)); //agregar la publicacion al estado global
    // Actualizar el estado con los datos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublication(prevState => ({
            ...prevState,
            [name]: value
        }));


    };

    // Actualizar el estado con la imagen
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const { name } = e.target;
            const file = e.target.files[0];

            setPublication(prevState => ({
                ...prevState,
                [name]: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    }
    return (
        <div>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className='form__field'>
                    <label htmlFor="title">Titulo</label>
                    <input type="text" id='title' placeholder='titulo'
                        name='title'
                        value={pulication.title}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" id='category' placeholder='categoria'
                        value={pulication.category}
                        name='category'
                        onChange={handleChange} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="description">Descripcion</label>
                    <textarea id="description" cols="30" rows="10" placeholder='descripcion'
                        name='description'
                        value={pulication.description}
                        onChange={handleChange}></textarea>
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="startDate">Fecha de inicio</label>
                    <input type="date" id='startDate' placeholder='fecha'
                        name='startDate'
                        value={pulication.startDate}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="endDate">Fecha de fin</label>
                    <input type="date" id='endDate' placeholder='fecha'
                        name='endDate'
                        value={pulication.endDate}
                        onChange={handleChange}
                    />
                </div>
                
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="image">Selecciona un imagen</label>
                    <input
                        type="file"
                        id='image'
                        name='image'
                        onChange={handleFileChange} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="contact" >Contacto</label>
                    <input type='text' id='contact' placeholder='contacto'
                        name='contact'
                        value={pulication.contact}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="organization">Organización</label>
                    <input type="text" id='organization' placeholder='nombre de la organización'
                        name='organization'
                        value={pulication.organization}
                        onChange={handleChange}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor=" linkInscription">Enlace de para inscribirse </label>
                    <input type="text" id='linkInscription' placeholder='Enlace de para inscribirse'
                        name='linkInscription'
                        value={pulication.linkInscription}
                        onChange={handleChange}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor="url">Mas Informacion </label>
                    <input type="text" id='url' placeholder='url para mas informacion'
                        name='url'
                        value={pulication.url}
                        onChange={handleChange}
                    />
                </div>
                <button className='form__btn' type='submit'>Enviar Solicitud</button>
            </form>
        </div>
    )
}

export default Form
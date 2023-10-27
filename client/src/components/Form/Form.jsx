/* eslint-disable react/prop-types */
// import {createPost} from '../../Redux/actions'
import {useDispatch} from 'react-redux'
import { createPost, getPosts } from '../../Redux/actions'
import useFormPostValidate from "../../hooks/useFormPostValidate";

import axios from 'axios';

const Form = ({ setPost, post }) => {
    const dispatch = useDispatch();
    const {handleValidate, error} = useFormPostValidate(post);


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(post)

        //los datos obligatorios:
        const { title, description, organization, startDate, contact, linkInscription } = post;

        if (!title || !description || !organization && !startDate || !contact || !linkInscription) {
            alert("Falta información");
        }

        else dispatch(createPost(post))

       setPost({
        ...post,
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
    };


    // Actualizar el estado con los datos del formulario
    const handleChange = (e) => {
        handleValidate(); 
        //console.log(error)
        const { name, value } = e.target;

        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));


    };

    // Actualizar el estado con la imagen
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const { name } = e.target;
            const file = e.target.files[0];

            setPost(prevState => ({
                ...prevState,
                [name]: file.name,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };
    return (
        <div>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className='form__field'>
                    <label htmlFor="title">Titulo</label>
                    {error.title && <p className='form__error'>{error.title}</p>}
                    <input type="text" id='title' placeholder='titulo'
                        name='title'
                        value={post.title}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category">Categoria</label>
                    {error.category && <p className='form__error'>{error.category}</p>}
                    <input type="text" id='category' placeholder='categoria'
                        value={post.category}
                        name='category'
                        onChange={handleChange} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="description">Descripcion</label>
                    {error.description && <p className='form__error'>{error.description}</p>}
                    <textarea id="description" cols="30" rows="10" placeholder='descripcion'
                        name='description'
                        value={post.description}
                        onChange={handleChange}></textarea>
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="startDate">Fecha de inicio</label>
                    <p className='form__error'>{error.startDate}</p>
                    <input type="date" id='startDate' placeholder='fecha'
                        name='startDate'
                        value={post.startDate}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="endDate">Fecha de fin</label>
                    <p className='form__error'>{error.endDate}</p>
                    <input type="date" id='endDate' placeholder='fecha'
                        name='endDate'
                        value={post.endDate}
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
                    {error.contact && <p className='form__error'>{error.contact}</p>}
                    <input type='text' id='contact' placeholder='contacto'
                        name='contact'
                        value={post.contact}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="organization">Organización</label>
                    {error.organization && <p className='form__error'>{error.organization}</p>}
                    <input type="text" id='organization' placeholder='nombre de la organización'
                        name='organization'
                        value={post.organization}
                        onChange={handleChange}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor=" linkInscription">Enlace de para inscribirse </label>
                    <input type="text" id='linkInscription' placeholder='Enlace de para inscribirse'
                        name='linkInscription'
                        value={post.linkInscription}
                        onChange={handleChange}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor="url">Mas Informacion </label>
                    <input type="text" id='url' placeholder='url para mas informacion'
                        name='url'
                        value={post.url}
                        onChange={handleChange}
                    />
                </div>
                <button className='form__btn' type='submit'>Enviar Solicitud</button>
            </form>
        </div>
    )
}

export default Form
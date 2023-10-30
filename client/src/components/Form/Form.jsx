/* eslint-disable react/prop-types */
import {useDispatch} from 'react-redux'
import { createPost,} from '../../Redux/actions'
import useFormPostValidate from "../../hooks/useFormPostValidate";
import Success from './Success';
import { useState } from 'react';
import { uploadImagePost } from './cloudinary';

const Form = ({ setPost, post }) => {

    const [isloadig, setLoading] = useState(false);
    const [imgFile, setImgFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const {handleValidate, error} = useFormPostValidate(post);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        //los datos obligatorios:
        const { title, description, organization, startDate, contact, category} = post;
   
        if (!title || !description || !organization || !startDate || !contact || !category) {
           setAlertMessage(true);
           setTimeout(() => {
                setAlertMessage(false);
           }, 4000)
            return
        }
        setAlertMessage(false);
        //  
        setLoading(true) 
        const res = await uploadImagePost(imgFile);
        setLoading(false);

        const fecha = new Date().toLocaleDateString();
        const partes = fecha.split('/');
        const fechaConvertida = partes[2] + '-' + partes[1] + '-' + partes[0];
        const updatedPost = { 
            ...post,
            image: res,  //agregar la url de la imagen
            creationDate: fechaConvertida, //agregar la fecha de creacion
        
        }
            // Luego, despachar el post actualizado
        dispatch(createPost(updatedPost));
        // Mostrar el éxito
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, [1500]);
   
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
        registrationLink: '',
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
    const uploadImage = async e => {   
        const file = e.target.files;
        const data = new FormData();
        //cerar un objeto de tipo formdata
        data.append('file', file[0]);
        setPost({
            ...post,
            imagePreview: URL.createObjectURL(file[0]) // mostrar imagen previa
        
        })
       
        data.append('upload_preset', 'demo2023'); 
        setImgFile(data) ; //guardar la imagen en el estado
     }

    return (
        <div>
            
            {success && <Success />} {/* Si se publica correctamente mostrar el mensaje */}
            <form action="" method='post' className='form' onSubmit={handleSubmit}>
                {alertMessage && <p className='form__alert'>Los campos obligatorios no deben ir vacíos</p>}
                <div className='form__field'>
                    <label htmlFor="title">Titulo <span className='form__span'>(obligatorio)</span></label>
                    {error.title && <p className='form__error'>{error.title}</p>}
                    <input type="text" id='title' placeholder='titulo'
                        name='title'
                        value={post.title}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category" >Categoria <span className='form__span'>(obligatorio)</span></label>
                    {error.category && <p className='form__error'>{error.category}</p>}
                    <input type="text" id='category' placeholder='categoria'
                        value={post.category}
                        name='category'
                        onChange={handleChange} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="description">Descripcion<span className='form__span'>(obligatorio)</span></label>
                    {error.description && <p className='form__error'>{error.description}</p>}
                    <textarea id="description" cols="30" rows="10" placeholder='descripcion'
                        name='description'
                        value={post.description}
                        onChange={handleChange}></textarea>
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="startDate">Fecha de inicio <span className='form__span'>(obligatorio)</span></label>
                    <p className='form__error'>{error.startDate}</p>
                    <input type="date" id='startDate' placeholder='fecha'
                        name='startDate'
                        value={post.startDate}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="endDate">Fecha de fin <span className='form__span'>(obligatorio)</span></label>
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
                    <input  type="file" 
                            name="image" 
                            id="image" 
                            onChange={uploadImage}/>
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="contact" >Contacto <span className='form__span'>(obligatorio)</span></label>
                    {error.contact && <p className='form__error'>{error.contact}</p>}
                    <input type='text' id='contact' placeholder='contacto'
                        name='contact'
                        value={post.contact}
                        onChange={handleChange} />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="organization">Organización <span className='form__span'>(obligatorio)</span></label>
                    {error.organization && <p className='form__error'>{error.organization}</p>}
                    <input type="text" id='organization' placeholder='nombre de la organización'
                        name='organization'
                        value={post.organization}
                        onChange={handleChange}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor="registrationLink">Enlace de para inscribirse </label>
                    <input type="text" id='registrationLink' placeholder='Enlace de para inscribirse'
                        name='registrationLink'
                        value={post.registrationLink}
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
                <button className='form__btn' type='submit' disabled={isloadig}>Enviar Solicitud</button>
            </form>
        </div>
    )
}

export default Form
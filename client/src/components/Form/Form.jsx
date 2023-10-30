/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { createPost, } from '../../Redux/actions/postsActions'

import Success from './Success';
import { useState } from 'react';
import { uploadImageCloudinary } from './cloudinary';
import { useForm } from 'react-hook-form'

const Form = ({ setPost, post }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const fecha = new Date().toLocaleDateString()
    const partes = fecha.split('/');
    const fechaConvertida = partes[2] + '-' + partes[1] + '-' + partes[0];
    const [isloadig, setLoading] = useState(false);
    const [imgFile, setImgFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async data => {

        setLoading(true)
        const res = await uploadImageCloudinary(imgFile);
        setLoading(false);
        const updatedPost = {
            ...data,
            image: res,  //agregar la url de la imagen
            creationDate: fechaConvertida,//agregar la fecha 
        };
        dispatch(createPost(updatedPost));
        // Mostrar el éxito
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, [2000]);
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
        //limpiar el formulario
        reset();
    }
    // Actualizar el estado con los datos del formulario
    const handleChange = (e) => {

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

        data.append('upload_preset', 'posts_users');
        setImgFile(data); //guardar la imagen en el estado
    }

    return (
        <div>

            {success && <Success frase='Se ha enviado al panel exitosamente' />} {/* Si se publica correctamente mostrar el mensaje */}
            <form action="" method='post' className='form' onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <div className='form__field'>
                    <label htmlFor="title">Titulo</label>
                    {errors?.title?.type === 'maxLength' && <p className='auth__error'>El titulo No debe tener más de 50 caracteres</p>}
                    {errors?.title?.type === 'minLength' && <p className='auth__error'>El titulo debe tener al menos 1 caracteres</p>}
                    {errors?.title?.type === 'required' && <p className='auth__error'>El titulo es obligatorio</p>}
                    <input type="text" id='title' placeholder='titulo'
                        {...register('title', { required: true, minLength: 1, maxLength: 50 })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category" >Categoria </label>
                    {errors?.category?.type === 'maxLength' && <p className='auth__error'>La categoria No debe tener más de 50 caracteres</p>}
                    {errors?.category?.type === 'minLength' && <p className='auth__error'>La categoria debe tener al menos 1 caracteres</p>}
                    {errors?.category?.type === 'required' && <p className='auth__error'>La categoria es obligatorio</p>}
                    <input type="text" id='category' placeholder='categoria'
                        {...register('category', { required: true, minLength: 1, maxLength: 50 })} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="description">Descripcion</label>
                    {errors?.description?.type === 'maxLength' && <p className='auth__error'>La descripcion No debe tener más de 1000 caracteres</p>}
                    {errors?.description?.type === 'minLength' && <p className='auth__error'>La descripcion debe tener al menos 1 caracteres</p>}
                    {errors?.description?.type === 'required' && <p className='auth__error'>La descripcion es obligatorio</p>}
                    <textarea id="description" cols="30" rows="10" placeholder='descripcion'
                        {...register('description', { required: true, minLength: 1, maxLength: 1000 })}
                    ></textarea>
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="startDate">Fecha de inicio </label>
                    {errors?.startDate?.type === 'required' && <p className='auth__error'>La fecha de inicio es obligatorio</p>}
                    {errors?.startDate?.type === 'min' && <p className='auth__error'>La fecha de inicio debe ser mayor a la fecha actual</p>}
                    {errors?.startDate?.type === 'pattern' && <p className='auth__error'>Debe ser una fecha valida</p>}

                    <input type="date" id='startDate' placeholder='fecha'
                        defaultValue={fechaConvertida}
                        {...register('startDate', {
                            required: true, min: fechaConvertida, pattern: {
                                value: /^\d{4}-\d{2}-\d{2}$/,
                                message: 'Debe ser una fecha valida'
                            }
                        })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="endDate">Fecha de fin </label>
                    {errors?.endDate?.type === 'required' && <p className='auth__error'>La fecha de fin es obligatorio</p>}
                    {errors?.endDate?.type === 'min' && <p className='auth__error'>La fecha de fin debe ser mayor a la fecha actual</p>}
                    <input type="date" id='endDate' placeholder='fecha'
                        {...register('endDate', {
                            required: true, min: fechaConvertida, pattern: {
                                value: /^\d{4}-\d{2}-\d{2}$/,
                                message: 'Debe ser una fecha valida'
                            }
                        })}
                    />
                </div>

                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="image">Selecciona un imagen</label>
                    <input type="file"
                        name="image"
                        id="image"
                        onChange={uploadImage} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="contact" >Contacto</label>
                    {errors?.contact?.type === 'required' && <p className='auth__error'>El contacto es obligatorio</p>}
                    {errors?.contact?.type === 'maxLength' && <p className='auth__error'>El contacto No debe tener más de 10 números</p>}
                    {errors?.contact?.type === 'minLength' && <p className='auth__error'>El contacto debe tener al menos 5 números</p>}
                    {errors?.contact?.type === 'pattern' && <p className='auth__error'>Debe ser un numero de telefono</p>}
                    <input type='text' id='contact' placeholder='contacto'
                        {...register('contact', {
                            required: true, minLength: 5, maxLength: 10, pattern: {
                                value: /^\d+$/,
                                message: 'Debe ser un numero de telefono'
                            }
                        })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="organization">Organización </label>

                    {errors?.organization?.type === 'maxLength' && <p className='auth__error'>El nombre de la organización No debe tener más de 50 caracteres</p>}
                    {errors?.organization?.type === 'minLength' && <p className='auth__error'>El nombre de la organización debe tener al menos 1 caracteres</p>}
                    {errors?.organization?.type === 'required' && <p className='auth__error'>El nombre de la organización es obligatorio</p>}
                    <input type="text" id='organization' placeholder='nombre de la organización'
                        {...register('organization', { required: true, minLength: 1, maxLength: 50 })}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor="registrationLink">Enlace de para inscribirse </label>
                    {errors?.registrationLink?.type === 'maxLength' && <p className='auth__error'>El enlace No debe tener más de 100 caracteres</p>}
                    {errors?.registrationLink?.type === 'minLength' && <p className='auth__error'>El enlace debe tener al menos 5 caracteres</p>}
                    {errors?.registrationLink?.type === 'pattern' && <p className='auth__error'>Debe ser un enlace valido</p>}
                    <input type="text" id='registrationLink' placeholder='Enlace de para inscribirse'
                        {...register('registrationLink', {
                            required: false, minLength: 5, maxLength: 100, pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: 'Debe ser un enlace valido'

                            }
                        })}
                    />
                </div>
                <div className='form__field'>
                    <label htmlFor="url">Mas Informacion </label>
                    {errors?.url?.type === 'maxLength' && <p className='auth__error'>El enlace No debe tener más de 100 caracteres</p>}
                    {errors?.url?.type === 'minLength' && <p className='auth__error'>El enlace debe tener al menos 5 caracteres</p>}
                    {errors?.url?.type === 'pattern' && <p className='auth__error'>Debe ser un enlace valido</p>}
                    <input type="text" id='url' placeholder='url para mas informacion'
                        {...register('url', {
                            required: false, minLength: 5, maxLength: 100, pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: 'Debe ser un enlace valido'

                            }
                        })}
                    />
                </div>
                <button className='form__btn' type='submit' disabled={isloadig}>Enviar Solicitud</button>
            </form>
        </div>
    )
}

export default Form
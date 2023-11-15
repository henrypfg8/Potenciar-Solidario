import { useDispatch, useSelector } from 'react-redux'
import { createPost, } from '../../Redux/actions/postsActions'
import { useNavigate, useParams } from 'react-router-dom';
import Swiper from './Swiper';
import { useEffect, useState } from 'react';
import { uploadImageCloudinary } from './cloudinary';
import { useForm, Controller, } from 'react-hook-form'
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input'
import proptypes from 'prop-types'
import { getProfile } from '../../Redux/auth/AuthActions';
import { jwtDecode } from 'jwt-decode'
import { configureHeaders } from '../../Redux/auth/configureHeaders ';
import axios from 'axios';

const Form = ({ setPost, post }) => {
    const dispatch = useDispatch();
    const [errorPost, setErrorPost] = useState(false);
    //Obtener el estado de autenticación
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);
    const categories = useSelector(state => state.ongsAndCategories.categories);
    //usar el hook form
    const { register, formState: { errors }, handleSubmit, reset, control, setValue, getValues } = useForm();
    const valuesPost = getValues();
    //Obtener el token
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    //Obtener el id de la publicación
    const { id } = useParams();
    //Obtener la fecha actual
    const fecha = new Date().toLocaleDateString()
    const partes = fecha.split('/');
    const fechaConvertida = partes[2] + '-' + partes[1] + '-' + partes[0];

    //Convertir el array de categorias en un array de objetos para el select
    const options = categories.map(cat => ({ value: cat.name, label: cat.name }));
    //iniciar el valor de la image en null
    const [imgFile, setImgFile] = useState(null);

    //Estado para mostrar el mensaje de exito
    const [success, setSuccess] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false)

    // Array de timeouts para limpiarlos en el useEffect
    const timeouts = [];

    useEffect(() => {
        if (!token || !isAuthenticated) {
            navigate('/login')
        }
        else {
            const decoded = jwtDecode(token);
            dispatch(getProfile(decoded.id, token)).then(() => {
                //console.log(userProfile)
            })
                .catch(error => {
                    console.log(error.response)
                })

        }
    }, [isAuthenticated, token])

    //useEffect para obtener una publicación por id, en caso que exista
    useEffect(() => { 
        const getPost = async () => {
            if (id) { // Si hay id, obtener la publicación
                const config = configureHeaders();
                try {
                    const { data } = await axios(`http://localhost:19789/posts/${id}`, config);
                    //poner los valores en el formulario por medio se setValue
                    setValue('title', data.title)
                    setValue('category', data.category)
                    setValue('description', data.description)
                    setValue('startDate', data.startDate)
                    setValue('endDate', data.endDate)
                    setValue('contact', data.contact)
                    setValue('registrationLink', data.registrationLink)
                    setValue('url', data.url)
                    setValue('image', data.image)
                    setValue('status', data.status)
                    setValue('organization', data.organization)
                    setValue('creationDate', data.creationDate)
                    setPost({ // Actualizar el estado con los datos de la publicación
                        ...post,
                        title: data.title,
                        category: data.category,
                        description: data.description,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        image: data.image,
                        creationDate: data.creationDate,
                        imagePreview: data.image,
                        contact: data.contact,
                        status: data.status,
                        organization: data.organization,
                        registrationLink: data.registrationLink,
                        url: data.url,
                    })


                }
                catch (error) {
                    console.log(error.response)
                }
                return
            }
        }
        getPost()
    }, [id])

    //funcion para Actualizar la publicación
    const handleUpdate = async (id, info) => {
        const { data } = await axios.put(`http://localhost:19789/posts/${id}`, { ...info }, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        });
        return data
    }

    // funcion para Enviar el formulario de la publicación
    const onSubmit = async data => { 

        const urlImage = await uploadImageCloudinary(imgFile);

        const updatedPost = {
            ...data,
            image: urlImage,  //agregar la url de la imagen
            creationDate: fechaConvertida,
            organization: userProfile.organization,
            status : false
        };
        if (id) { // Si hay un id, actualizar la publicación
            await handleUpdate(id, updatedPost)
                .then(() => {

                    setSuccessUpdate(true);
                    setErrorPost(false);

                    const successTimeout = setTimeout(() => {
                        navigate('/profile/posts');
                        setSuccessUpdate(false);
                    }, 3000);
                    timeouts.push(successTimeout);
                })
                .catch((error) => {
                    console.log(error.response.data)
                    setErrorPost(true);
                    setSuccessUpdate(false);
                    const errorTimeout = setTimeout(() => {
                        setErrorPost(false);
                    }, 3000);
                    timeouts.push(errorTimeout);
                })

        }
        else { // Si no hay id, crear nueva publicación

            dispatch(createPost(updatedPost))
                .then(() => {

                    setSuccess(true);
                    setErrorPost(false);

                    const successTimeout = setTimeout(() => {
                        navigate('/');
                        setSuccess(false);
                    }, 3000);
                    timeouts.push(successTimeout);


                }).catch((error) => {
                    console.log(error.response.data.message)
                    setErrorPost(true);
                    setSuccess(false);
                 
                    const errorTimeout = setTimeout(() => {
                        setErrorPost(false);
                    }, 3000);
                    timeouts.push(errorTimeout);
                })
        }

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
        
        reset();//limpiar el formulario
        return
    }

    useEffect(() => { // Limpia los timeouts
        return () => {
            timeouts.forEach(clearTimeout); // Limpia todos los timeouts
        };
    }, [timeouts]);

    // Actualizar el estado con los datos del formulario, Para la vista previa
    const handleChange = (e) => {
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
            {errorPost && (<p className='form__alert'>No se pudo crear la publicación</p>)} {/* Si no se publica correctamente mostrar el mensaje */}
            {success && <Swiper frase='Se ha enviado al panel exitosamente' color='#005692' tipo='success' />} {/* Si se publica correctamente mostrar el mensaje */}
            {successUpdate && <Swiper frase='Se ha actualizado la publicación exitosamente' color='#005692' tipo='success' />} {/* Si se actualiza correctamente mostrar el mensaje */}
            <form action="" method='post' className='form' onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <div className='form__field'>
                    <label htmlFor="title">Titulo</label>
                    {errors?.title?.type === 'maxLength' && <p className='form__alert'>El titulo No debe tener más de 50 caracteres</p>}
                    {errors?.title?.type === 'minLength' && <p className='form__alert'>El titulo debe tener al menos 5 caracteres</p>}
                    {errors?.title?.type === 'required' && <p className='form__alert'>El titulo es obligatorio</p>}
                    <input type="text" id='title' placeholder='titulo'
                        defaultValue={valuesPost.title}
                        {...register('title', { required: true, minLength: 5, maxLength: 50 })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category">Categoria</label>
                    {errors.category && <p className='form__alert'>La categoria es obligatoria</p>}
                    <Controller
                        defaultValue={valuesPost.category}
                        name="category"
                        control={control}
                        rules={{ required: 'La categoria es obligatoria' }} // Reglas de validación con mensaje de error
                        render={({ field, fieldState: { error } }) => (
                            //console.log(error),
                            <Select
                                {...field}
                                name='category'
                                options={options}
                                onChange={(e) => {
                                    // Actualiza el valor del formulario
                                    field.onChange(e.value);
                                    setPost({ ...post, category: e.value })
                                }}
                                defaultValue={valuesPost.category}

                                value={options.find(option => option.value === field.value)}
                            />
                        )}
                    />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="description">Descripcion</label>
                    {errors?.description?.type === 'maxLength' && <p className='form__alert'>La descripcion No debe tener más de 1000 caracteres</p>}
                    {errors?.description?.type === 'minLength' && <p className='form__alert'>La descripcion debe tener al menos 20 caracteres</p>}
                    {errors?.description?.type === 'required' && <p className='form__alert'>La descripcion es obligatorio</p>}
                    <textarea id="description" cols="30" rows="10" placeholder='descripcion'
                        defaultValue={valuesPost.description}
                        {...register('description', { required: true, minLength: 20, maxLength: 1000 })}
                    ></textarea>
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="startDate">Fecha de inicio </label>
                    {errors?.startDate?.type === 'required' && <p className='form__alert'>La fecha de inicio es obligatorio</p>}
                    {errors?.startDate?.type === 'min' && <p className='form__alert'>La fecha de inicio debe ser mayor a la fecha actual</p>}
                    {errors?.startDate?.type === 'pattern' && <p className='form__alert'>Debe ser una fecha valida</p>}

                    <input type="date" id='startDate' placeholder='fecha'
                        name='startDate'
                        defaultValue={post.startDate}
                        {...register('startDate', {
                            required: true, min: fechaConvertida, pattern: {
                                value: /^\d{4}-\d{2}-\d{2}$/,
                                message: 'Debe ser una fecha valida',
                            }
                        })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="endDate">Fecha de fin </label>
                    {errors?.endDate?.type === 'required' && <p className='form__alert'>La fecha de fin es obligatorio</p>}
                    {errors?.endDate?.type === 'min' && <p className='form__alert'>La fecha de fin debe ser mayor a la fecha actual</p>}
                    <input type="date" id='endDate' placeholder='fecha'
                        defaultValue={post.endDate}
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
                        accept='image/*'
                        onChange={uploadImage} />
                </div>
                {/* End form field */}

                <div className='form__field'>
                    <label htmlFor="contact" >Contacto</label>
                    {errors?.contact?.type === 'required' && <p className='form__alert'>El contacto es obligatorio</p>}
                    <Controller
                        name='contact'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={post.contact}

                        render={({ field, fieldState: { error } }) => {
                            return (
                                <PhoneInput
                                    {...field}
                                    id='contact'
                                    placeholder='Escribe tu número de telefono'
                                    onChange={(e) => {
                                        // Actualiza el valor del formulario
                                        field.onChange(e);
                                        setPost({ ...post, contact: e })
                                    }}
                                    value={field.value}
                                    defaultCountry='AR'
                                    international
                                    countryCallingCodeEditable={false}
                                    limitMaxLength={true}
                                />
                            )
                        }}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="registrationLink">Enlace de para inscribirse </label>
                    {errors?.registrationLink?.type === 'maxLength' && <p className='form__alert'>El enlace No debe tener más de 100 caracteres</p>}
                    {errors?.registrationLink?.type === 'minLength' && <p className='form__alert'>El enlace debe tener al menos 5 caracteres</p>}
                    {errors?.registrationLink?.type === 'pattern' && <p className='form__alert'>Debe ser un enlace valido</p>}
                    <input type="text" id='registrationLink' name='registrationLink' placeholder='Enlace de para inscribirse'
                        defaultValue={post.registrationLink}
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
                    {errors?.url?.type === 'maxLength' && <p className='form__alert'>El enlace No debe tener más de 100 caracteres</p>}
                    {errors?.url?.type === 'minLength' && <p className='form__alert'>El enlace debe tener al menos 5 caracteres</p>}
                    {errors?.url?.type === 'pattern' && <p className='form__alert'>Debe ser un enlace valido</p>}
                    <input type="text" id='url' placeholder='url para mas informacion'
                        defaultValue={post.url}
                        {...register('url', {
                            required: false, minLength: 5, maxLength: 100, pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: 'Debe ser un enlace valido'

                            }
                        })}
                    />
                </div>
                <button className='form__btn' type='submit'>{ id ? 'Actualizar Publicacion': 'Enviar Solicitud'}</button>
            </form>
        </div>
    )
}

Form.propTypes = {
    post: proptypes.object.isRequired,
    setPost: proptypes.func.isRequired
}
export default Form
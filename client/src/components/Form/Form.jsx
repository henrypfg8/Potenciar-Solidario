import { useDispatch, useSelector } from 'react-redux'
import { createPost, } from '../../Redux/actions/postsActions'
import { useNavigate } from 'react-router-dom';
import Swiper from './Swiper';
import { useEffect, useState } from 'react';
import { uploadImageCloudinary } from './cloudinary';
import { useForm, Controller,} from 'react-hook-form'
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input'
import proptypes from 'prop-types'

const Form = ({ setPost, post }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.ongsAndCategories.categories);
    const [errorPost, setErrorPost] = useState(false);
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset, control } = useForm();

    //Obtener la fecha actual
    const fecha = new Date().toLocaleDateString()
    const partes = fecha.split('/');
    const fechaConvertida = partes[2] + '-' + partes[1] + '-' + partes[0];

    //Convertir el array de categorias en un array de objetos para el select
    const options = categories.map(cat => ({ value: cat.name, label: cat.name }));
  

    const [imgFile, setImgFile] = useState(null);
    const [success, setSuccess] = useState(false);

    // Array de timeouts para limpiarlos en el useEffect
    const timeouts = []; 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
            return
        }
    }, [isAuthenticated, navigate])

    const onSubmit = async data => { // Enviar el formulario de la publicación

        const urlImage = await uploadImageCloudinary(imgFile);

        const updatedPost = {
            ...data,
            image: urlImage,  //agregar la url de la imagen
            creationDate: fechaConvertida,
            
           
        };

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
                setErrorPost(true);
                setSuccess(false);
                console.log(error.response.data.message)
                const errorTimeout = setTimeout(() => {
                    setErrorPost(false);
                }, 3000);
                timeouts.push(errorTimeout);
            })

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
        return
    }

    useEffect(() => { // Limpia los timeouts
        return () => {
            timeouts.forEach(clearTimeout); // Limpia todos los timeouts
        };
    }, [timeouts]);

    // Actualizar el estado con los datos del formulario
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
            <form action="" method='post' className='form' onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <div className='form__field'>
                    <label htmlFor="title">Titulo</label>
                    {errors?.title?.type === 'maxLength' && <p className='form__alert'>El titulo No debe tener más de 50 caracteres</p>}
                    {errors?.title?.type === 'minLength' && <p className='form__alert'>El titulo debe tener al menos 5 caracteres</p>}
                    {errors?.title?.type === 'required' && <p className='form__alert'>El titulo es obligatorio</p>}
                    <input type="text" id='title' placeholder='titulo'
                        {...register('title', { required: true, minLength: 5, maxLength: 50 })}
                    />
                </div>
                {/* End form field */}
                <div className='form__field'>
                    <label htmlFor="category">Categoria</label>
                    {errors.category && <p className='form__alert'>La categoria es obligatoria</p>}
                    <Controller
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
                                    setPost({...post, category: e.value})
                                }}
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
                        defaultValue={fechaConvertida}
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
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <PhoneInput

                                    {...field}

                                    id='contact'
                                    placeholder='Escribe tu número de telefono'
                                    onChange={(e) => {
                                        // Actualiza el valor del formulario
                                        field.onChange(e);
                                        setPost({...post, contact: e})
                                    }}
                                    value={field.value}
                                    defaultCountry='AR'
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
                        {...register('url', {
                            required: false, minLength: 5, maxLength: 100, pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: 'Debe ser un enlace valido'

                            }
                        })}
                    />
                </div>
                <button className='form__btn' type='submit'>Enviar Solicitud</button>
            </form>
        </div>
    )
}

Form.propTypes = {
    post: proptypes.object.isRequired,
    setPost: proptypes.func.isRequired
}
export default Form
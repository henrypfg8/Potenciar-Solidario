import { useForm } from 'react-hook-form' // validaciones con react-hook-form
import './auth.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, } from '../../Redux/auth/AuthActions';
import Swiper from '../Form/Swiper';
import { uploadImageCloudinary } from '../Form/cloudinary';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [success, setSuccess] = useState(false);

    const { errorRegister} = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Configuración del hook form


    // Función para validar que la fecha es de alguien que tiene al menos 18 años
    const validateAge = (value) => {
        const inputDate = new Date(value);
        const currentDate = new Date();
        const minDate = new Date(
            currentDate.getFullYear() - 18,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        return inputDate <= minDate || "Debe tener al menos 18 años";
    }


    const onSubmit = async user => { // Función que se ejecuta al hacer submit

            const data = new FormData();
            data.append('file', user.profile_picture[0]);
            data.append('upload_preset', 'photo_users');
            const result = await uploadImageCloudinary(data); // Subir la imagen a cloudinary
            user.profile_picture = result;

            //Hacer el dispatch de la acción para crear el usuario
            setSuccess(true);

            dispatch(registerUser(user))
                .then(data  => {
                if (data) {
                    navigate('/login')
                }
            
                }) 
                .catch(error => console.log(error))
            // Limpiar el formulario

            setTimeout(() => {
                setSuccess(false);

            }, 3000);
            reset();
            return
        
    

    };
    return (
        <div className='auth__container' >
            {success && !errorRegister && <Swiper frase='Haz Creado tu cuenta exitosamente, Ahora inicia sesión' color='#005692' tipo='success' />}
            {/* {error && errorRegister  && <Success frase='No se pudo crear tu cuenta' color='#DD0C0C' tipo='error' />} */}
         
            <form action="" method='post' onSubmit={handleSubmit(onSubmit)} className='auth__form' autoCorrect='off'>
            {/* {errorRegister && <p className='auth__error'>El correo ya esta en uso</p>} */}

                {/* campo para el nombre */}
                <div>
                    <label className='auth__label' htmlFor="name">nombre</label>
                    {errors?.name?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.name?.type === 'minLength' && <p className='auth__error'>Tu nombre debe ser minímo de 2 caracterés</p>}
                    {errors?.name?.type === 'maxLength' && <p className='auth__error'>Tu nombre debe ser máximo de 50 caracterés</p>}
                    <input className='auth__input'
                        type="text"
                        {...register('name', { required: true, minLength: 2, maxLength: 50 },)} // Validación de nombre
                        id='name' placeholder='Escribe tu nombre'
                    />
                </div>

                {/* campo para el apellido */}
                <div>
                    <label className='auth__label' htmlFor="lastname">apellido</label>
                    {errors?.lastname?.type === 'required' && <p className='auth__error'> Tu apellido es obligatorio</p>}
                    {errors?.lastname?.type === 'maxLength' && <p className='auth__error'>Tu apellido debe ser máximo de 50 caracterés</p>}
                    <input className='auth__input'
                        type="text"
                        {...register('lastname', { maxLength: 50, required: true })} // Validación de nombre
                        id='lastname' placeholder='Escribe tu apellido'
                    />
                </div>

                {/* campo para el correo */}
                <div>
                    <label className='auth__label' htmlFor="email">correo</label>
                    {errors?.email?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.email?.type === 'minLength' && <p className='auth__error'>Tu correo debe ser minímo de 3 caracterés</p>}
                    {errors?.email?.type === 'maxLength' && <p className='auth__error'>Tu correo debe ser máximo de 40 caracterés</p>}
                    {errors?.email?.type === 'pattern' && <p className='auth__error'>Debes escribir un correo válido</p>}
                    <input className='auth__input'
                        type="email"
                        {...register('email', {
                            required: true, minLength: 3, maxLength: 40, pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Expresión regular para validar el correo
                                message: "Debes escribir un correo válido"
                            }
                        })}
                        id='email' placeholder='Escribe tu correo'
                    />
                </div>

                {/* campo para la contraseña */}
                <div>
                    <label className='auth__label' htmlFor="password">Escribe tu contraseña</label>
                    {errors?.password?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.password?.type === 'minLength' && <p className='auth__error'>Tu contraseña debe ser minímo de 6 caracterés</p>}
                    {errors?.password?.type === 'maxLength' && <p className='auth__error'>Tu contraseña debe ser máximo de 50 caracterés</p>}
                    {errors?.password?.type === 'pattern' && <p className='auth__error'>Tu contraseña debe tener al menos un número y una letra</p>}
                    <input className='auth__input'
                        type="password" {...register('password', {
                            required: true, minLength: 6, maxLength: 50, pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // Expresión regular para validar la contraseña
                            }
                        })} // Validación de contraseña
                        id='password' placeholder='Escribe tu password' />
                </div>

                {/* campo para la fecha de nacimiento */}
                <div>
                    <label className='auth__label' htmlFor="birth_date">Fecha de nacimiento</label>
                    {errors?.birth_date?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.birth_date?.type === 'validate' && <p className='auth__error'>Debe tener al menos 18 años</p>}
                    <input className='auth__input'
                        type="date"
                        {...register('birth_date', {
                            required: true,
                            validate: validateAge
                        })} />
                </div>

                {/* Campo para el telefono */}
                <div>
                    <label className='auth__label' htmlFor="phone">Número de telefono</label>
                    {errors?.phone?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.phone?.type === 'pattern' && <p className='auth__error'>Debe ser un número de telefono</p>}
                    {errors?.phone?.type === 'maxLength' && <p className='auth__error'>Tu telefono debe ser máximo de 8 digitos</p>}
                    <input className='auth__input'
                        type="text" {...register('phone', {
                            required: true, maxLength: 8, pattern: { // Validación de telefono
                                value: /^\d+$/,
                                message: "Debe ser un numero de telefono"
                            }
                        })}
                        id='phone' placeholder='Número de telefono' />
                </div>

                {/* Campo para el DNI */}
                <div>
                    <label className='auth__label' htmlFor="DNI">DNI</label>
                    {errors?.DNI?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.DNI?.type === 'minLength' && <p className='auth__error'>Tu DNI debe ser minímo de 5 caracterés</p>}
                    {errors?.DNI?.type === 'maxLength' && <p className='auth__error'>Tu DNI debe ser máximo de 8 caracterés</p>}
                    {errors?.DNI?.type === 'pattern' && <p className='auth__error'>Debe ser un número  valido de DNI</p>}
                    <input className='auth__input'
                        type="text" {...register('DNI', {
                            required: true, minLength: 5, maxLength: 8, pattern: { // Validación de DNI
                                value: /^\d+$/,
                                message: "Debe ser un numero de DNI"
                            }
                        })}
                        id='DNI' placeholder='Número de DNI' />
                </div>

                {/* Campo para subir foto */}
                <div>
                    <label className='auth__label' htmlFor="profile_picture">Foto de perfil</label>
                    {errors?.profile_picture?.type === 'pattern' && <p className='auth__error'>Debe ser un archivo de imagen</p>}
                    <input className='auth__input'
                        type="file" {...register('profile_picture', {
                            required: false, pattern: { // Validación de foto de perfil
                                value: '([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)',
                                message: "Debe ser un archivo de imagen"
                            }
                        })}
                        id='profile_picture' />
                </div>

                {/* Campo de  lugar de residencia*/}
                <div>
                    <label className='auth__label' htmlFor="habitual_location_of_residence">Lugar de recidencia</label>
                    {errors?.habitual_location_of_residence?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.habitual_location_of_residence?.type === 'minLength' && <p className='auth__error'>Tu lugar de residencia debe ser minímo de 2 caracterés</p>}
                    {errors?.habitual_location_of_residence?.type === 'maxLength' && <p className='auth__error'>Tu lugar de residencia debe ser máximo de 70 caracterés</p>}
                    <input className='auth__input'
                        type="text" {...register('habitual_location_of_residence', { required: true, minLength: 2, maxLength: 70 })}  // Validación de lugar de residencia
                        id='habitual_location_of_residence' placeholder='Lugar de residencia' />
                </div>

                {/* Campo de  area de localizacion */}
                <div>
                    <label className='auth__label' htmlFor="geographical_area_residence">Are de Localización</label>
                    {errors?.geographical_area_residence?.type === 'maxLength' && <p className='auth__error'>Tu area de localización debe ser máximo de 50 caracterés</p>}
                    <input className='auth__input'
                        type="text" {...register('geographical_area_residence', { maxLength: 50 })}  // Opcional
                        id='geographical_area_residence' placeholder='Tu Localización' />
                </div>
                <div>
                    <label className='auth__label' htmlFor="description">Descripcion</label>
                    {errors?.description?.type === 'required' && <p className='auth__error'>Este campo es obligatorio</p>}
                    {errors?.description?.type === 'maxLength' && <p className='auth__error'>Tu descripcion debe ser máximo de 100 caracterés</p>}
                    <input className='auth__input'

                        type="text" {...register('description', { maxLength: 100, required: true })}  // Opcional
                        id='description' placeholder='Alguna descripción' />
                </div>

                {/* boton para crear cuenta */}
                <button className='auth__btn' type='submit'>Crear cuenta</button>
                <div>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register
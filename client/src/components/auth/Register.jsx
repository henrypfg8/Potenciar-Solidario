import { useState } from 'react';
import {  useForm } from 'react-hook-form' // validaciones con react-hook-form
import './auth.css';
import Success from '../Form/Success';
import { uploadImagePost } from '../Form/cloudinary';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Configuración del hook form
    
    const validateAge = (value) => {
        const inputDate = new Date(value);
        const currentDate = new Date();
        const minDate = new Date(
            currentDate.getFullYear() - 18,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        return inputDate <= minDate || "Debe tener al menos 18 años";
    };
    const onSubmit = async user => { // Función que se ejecuta al hacer submit

        const data = new FormData();
        data.append('file', user.profile_picture[0]);
        data.append('upload_preset', 'demo2023');
       setSuccess(true);
        const result = await uploadImagePost(data); // Subir la imagen a cloudinary
        user.profile_picture = result;
        navigate('/'); // Agregar la imagen al objeto user
        setTimeout(() => {
            setSuccess(false);
           
        }, 2000);

        //Hacer el dispatch de la acción para crear el usuario



        // Limpiar el formulario
        reset();

    }

    return (
        <div className='auth__container' >
           {success  &&  <Success frase='Haz creado tu cuenta exitosamente'/>}
            <form action="" method='post' onSubmit={handleSubmit(onSubmit)} className='auth__form' autoCorrect='off'>

                {/* campo para el nombre */}
                <div>
                    <label className='auth__label' htmlFor="name">nombre</label>
                    {errors.name && <p className='auth__error'>El nombre es obligatorio</p>}
                    <input className='auth__input'
                        type="text"
                        {...register('name', {
                            required: true, minLength: 1, maxLength: 50, min: 1, max: 10, validate: {

                            }
                        },)} // Validación de nombre
                        id='name' placeholder='Escribe tu nombre'
                    />
                </div>

                {/* campo para el apellido */}
                <div>
                    <label className='auth__label' htmlFor="lastname">apellido</label>

                    <input className='auth__input'
                        type="text"
                        {...register('lastname')} // Validación de nombre
                        id='lastname' placeholder='Escribe tu apellido'
                    />
                </div>

                {/* campo para el correo */}
                <div>
                    <label className='auth__label' htmlFor="email">correo</label>
                    {errors?.email?.type === 'required' && <p className='auth__error'>El correo es obligatorio</p>}
                    {errors?.email?.type === 'minLength' && <p className='auth__error'>El correo debe tener minímo 3 caracterés</p>}
                    {errors?.email?.type === 'maxLength' && <p className='auth__error'>El correo debe tener máximo 40 caracterés</p>}
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
                    {errors?.password?.type === 'required' && <p className='auth__error'>La contraseña es obligatoria</p>}
                    {errors?.password?.type === 'minLength' && <p className='auth__error'>La contraseña debe tener minímo 6 caracterés</p>}
                    {errors?.password?.type === 'maxLength' && <p className='auth__error'>La contraseña debe tener máximo 50 caracterés</p>}
                    {errors?.password?.type === 'pattern' && <p className='auth__error'>La contraseña debe tener al menos una mayúscula, una minúscula y un número</p>}
                    <input className='auth__input'
                        type="password" {...register('password', {
                            required: true, minLength: 6, maxLength: 50, pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, // Expresión regular para validar la contraseña
                                message: "Debe tener al menos una mayúscula, una minúscula y un número"
                            }
                        })} // Validación de contraseña
                        id='password' placeholder='Escribe tu password' />
                </div>

                {/* campo para la fecha de nacimiento */}
                <div>
                    <label className='auth__label' htmlFor="birth_date">Fecha de nacimiento</label>
                    {errors?.birth_date?.type === 'required' && <p className='auth__error'>La fecha de nacimiento es obligatoria</p>}
                    {errors?.birth_date?.type === 'validate' && <p className='auth__error'>Debes tener al menos 18 años</p>}
                    <input className='auth__input'
                        type="date"
                        {...register('birth_date', {
                            required: 'Este campo es obligatorio',
                            validate: validateAge
                        })}
                        id='birth_date' />
                </div>

                {/* Campo para el telefono */}
                <div>
                    <label className='auth__label' htmlFor="phone">Número de telefono</label>
                    {errors?.phone?.type === 'required' && <p className='auth__error'>El telefono es obligatorio</p>}
                    {errors?.phone?.type === 'minLength' && <p className='auth__error'>El telefono debe tener minímo 5 caracterés</p>}
                    {errors?.phone?.type === 'maxLength' && <p className='auth__error'>El telefono debe tener máximo 10 caracterés</p>}
                    {errors?.phone?.type === 'pattern' && <p className='auth__error'>Debes escribir un numero de telefono</p>}
                    <input className='auth__input'
                        type="text" {...register('phone', {
                            required: true, minLength: 5, maxLength: 10, pattern: { // Validación de telefono
                                value: /^\d+$/,
                                message: "Debe ser un numero de telefono"
                            }
                        })}
                        id='phone' placeholder='Número de telefono' />
                </div>

                {/* Campo para el DNI */}
                <div>
                    <label className='auth__label' htmlFor="DNI">DNI</label>
                    {errors?.DNI?.type === 'required' && <p className='auth__error'>El DNI es obligatorio</p>}
                    {errors?.DNI?.type === 'minLength' && <p className='auth__error'>El DNI debe tener minímo 5 caracterés</p>}
                    {errors?.DNI?.type === 'maxLength' && <p className='auth__error'>El DNI debe tener máximo 10 caracterés</p>}
                    {errors?.DNI?.type === 'pattern' && <p className='auth__error'>Debes escribir un numero de DNI</p>}
                    <input className='auth__input'
                        type="text" {...register('DNI', {
                            required: true, minLength: 5, maxLength: 10, pattern: { // Validación de DNI
                                value: /^\d+$/,
                                message: "Debe ser un numero de DNI válido"
                            }
                        })}
                        id='DNI' placeholder='Número de DNI' />
                </div>

                {/* Campo para subir foto */}
                <div>
                    <label className='auth__label' htmlFor="profile_picture">Foto de perfil</label>
                    { }
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
                    {errors.habitual_location_of_residence && <p className='auth__error'>Este campo es obligatorio</p>}
                    <input className='auth__input'
                        type="text" {...register('habitual_location_of_residence', { required: true, minLength: 2 })}  // Validación de lugar de residencia
                        id='habitual_location_of_residence' placeholder='Lugar de residencia' />
                </div>

                {/* Campo de  area de localizacion */}
                <div>
                    <label className='auth__label' htmlFor="geographical_area_residence">Area de Localización</label>
                    <input className='auth__input'
                        type="text" {...register('geographical_area_residence')}  // Opcional
                        id='geographical_area_residence' placeholder='Tu Localización' />
                </div>
                <div>
                    <label className='auth__label' htmlFor="description">Descripcion</label>
                    <input className='auth__input'
                        type="text" {...register('description')}  // Opcional
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
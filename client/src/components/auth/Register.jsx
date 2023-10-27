import { useForm } from 'react-hook-form' // validaciones con react-hook-form
import './auth.css'

const Register = () => {

    const { register, handleSubmit, formState: { errors }} = useForm(); // Configuración del hook form

    const onSubmit = user => { // Función que se ejecuta al hacer submit

        user.profile_picture = user.profile_picture[0].name // Se agrega el nombre de la imagen al objeto user
        console.log(user); //datos del formulario
    }

    return (
        <div className='auth__container' >
            <form action="" onSubmit={handleSubmit(onSubmit)} className='auth__form' autoCorrect='off'>

                {/* campo para el nombre */}
                <div>
                    <label className='auth__label' htmlFor="name">nombre</label>
                    {errors.name && <p className='auth__error'>El nombre es obligatorio</p>}
                    <input className='auth__input' 
                        type="text" 
                        {...register('name', { required: true, minLength: 3, maxLength: 50 },)} // Validación de nombre
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
                    {errors.email && <p className='auth__error'>Debe ser un correo valido</p>}
                    <input className='auth__input' 
                        type="email" 
                        {...register('email', { required: true, minLength: 3, maxLength: 40,   pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Expresión regular para validar el correo
                            message: "Debes escribir un correo válido"
                        }})} 
                        id='email' placeholder='Escribe tu correo' 
                        />
                </div>

                {/* campo para la contraseña */}
                <div>
                    <label className='auth__label' htmlFor="password">Escribe tu contraseña</label>
                    {errors.password && <p className='auth__error'>Tu contraseña debe ser minímo de 6 caracterés</p>}
                    <input className='auth__input' 
                        type="password" {...register('password', { required: true, minLength: 6, maxLength: 50 })} // Validación de contraseña
                        id='password' placeholder='Escribe tu password' />
                </div>
                
                {/* campo para la fecha de nacimiento */}
                <div>
                    <label className='auth__label' htmlFor="birth_date">Fecha de nacimiento</label>
                    {errors.birth_date && <p className='auth__error'>Este campo es obligatorio</p>}
                    <input className='auth__input' 
                        type="date" {...register('birth_date', { required: true,})} // Validación de fecha de nacimiento
                        id='birth_date' />
                </div>
                    
                    {/* Campo para el telefono */}
                <div>
                    <label className='auth__label' htmlFor="phone">Número de telefono</label>
                    {errors.phone && <p className='auth__error'>Debe ser un numero de telefono</p>}
                    <input className='auth__input' 
                        type="text" {...register('phone', { required: true, pattern :{ // Validación de telefono
                            value : /^\d+$/,
                            message : "Debe ser un numero de telefono"
                        }})}
                        id='phone' placeholder='Número de telefono' />
                </div>

                {/* Campo para el DNI */}
                <div>
                    <label className='auth__label' htmlFor="DNI">DNI</label>
                    {errors.DNI && <p className='auth__error'>Debe ser tu número de DNI</p>}
                    <input className='auth__input' 
                        type="text" {...register('DNI',{ required: true, pattern :{ // Validación de DNI
                            value : /^\d+$/,
                            message : "Debe ser un numero de DNI"
                        }})} 
                        id='DNI' placeholder='Número de DNI' />
                </div>

                {/* Campo para subir foto */}
                <div>
                    <label className='auth__label' htmlFor="profile_picture">Foto de perfil</label>
                    {errors.profile_picture && <p className='auth__error'>Selecciona una foto válida</p>}
                    <input className='auth__input' 
                        type="file" {...register('profile_picture',{ required: true, pattern :{ // Validación de foto de perfil
                            value : '([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)',
                            message : "Debe ser un archivo de imagen"
                        }})} 
                        id='profile_picture' />
                </div>

                {/* Campo de  lugar de residencia*/}
                <div>
                    <label className='auth__label' htmlFor="habitual_location_of_residence">Lugar de recidencia</label>
                    {errors.habitual_location_of_residence && <p className='auth__error'>Este campo es obligatorio</p>}
                    <input className='auth__input' 
                        type="text" {...register('habitual_location_of_residence', { required: true, minLength: 5})}  // Validación de lugar de residencia
                        id='habitual_location_of_residence' placeholder='Lugar de residencia' />
                </div>

                    {/* Campo de  area de localizacion */}
                <div>
                    <label className='auth__label' htmlFor="geographical_area_residence">Are de Localización</label>
                    {errors.geographical_area_residence && <p className='auth__error'>Este campo es obligatorio</p>}
                    <input className='auth__input' 
                        type="text" {...register('geographical_area_residence', { required: true, minLength: 5, })}  // Validación de area de localización
                        id='geographical_area_residence' placeholder='Tu Localización' />
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
import { useForm } from 'react-hook-form'
import './auth.css'
const Register = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const onSubmit = user => {
        console.log(user); //datos del formulario
    }
    return (
        <div className='auth__container' >
            <form action="" onSubmit={handleSubmit(onSubmit)} className='auth__form' autoCorrect='off'>
                <div>
                    <label className='auth__label' htmlFor="name">nombre</label>
                    {errors.name && <p className='auth__error'>El nombre es obligatorio</p>}
                    <input className='auth__input' 
                        type="text" 
                        {...register('name', { required: true, minLength: 3, maxLength: 50 },)} 
                        id='name' placeholder='Escribe tu nombre' 
                    />
                </div>
                <div>
                    <label className='auth__label' htmlFor="email">correo</label>
                    {errors.email && <p className='auth__error'>Debe ser un correo valido</p>}
                    <input className='auth__input' 
                        type="email" 
                        {...register('email', { required: true, minLength: 3, maxLength: 40,   pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Debes escribir un correo válido"
                        }})} 
                        id='email' placeholder='Escribe tu correo' 
                        />
                </div>
                <div>
                    <label className='auth__label' htmlFor="password">Escribe tu contraseña</label>
                    {errors.password && <p className='auth__error'>To contraseña debe ser minímo de 6 caracterés</p>}
                    <input className='auth__input' 
                        type="password" {...register('password', { required: true, minLength: 6, maxLength: 50 })} 
                        id='password' placeholder='Escribe tu password' />
                </div>
                <div>
                    <label className='auth__label' htmlFor="password2">Repite tu contraseña</label>
                    {errors.password2 && <p className='auth__error'>{errors.password2.message}</p>}
                    <input className='auth__input' 
                        type="password"
                        {...register('password2', {
                            required: "Debes repetir tu contraseña",
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Las contraseñas no coinciden";
                                }
                            }
                        })}
                        id='password2'
                        placeholder='Escribe tu password'
                    />
                </div>
                <button className='auth__btn' type='submit'>Crear cuenta</button>
                <div>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register
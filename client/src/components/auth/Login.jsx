import {useForm} from 'react-hook-form'
import './auth.css';

const Login = () => {
    
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    
    const onSubmit = user => {
        console.log(user); //datos del formulario

        //Hacer el dispatch de la acción para iniciar sesión

        // Limpiar el formulario
        reset();
    }

  return (
    <div className='auth__container' >
    <form action="" method='post' onSubmit={handleSubmit(onSubmit)} className='auth__form' autoCorrect='off'>
        {/* campo para el email */}
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
        {/* Campo para la contraseñá */}
        <div>
            <label className='auth__label' htmlFor="password">Escribe tu contraseña</label>
            {errors.password && <p className='auth__error'>Tu contraseña debe ser minímo de 6 caracterés</p>}
            <input className='auth__input' 
                type="password" {...register('password', { required: true, minLength: 6, maxLength: 50 })} 
                id='password' placeholder='Escribe tu password' />
        </div>

        <button className='auth__btn' type='submit'>Iniciar Sesión</button>
        <div>
            <p>¿No tienes Cuenta? <a href="/register">Crear Cuenta</a></p>
        </div>
    </form>
</div>
  )
}

export default Login
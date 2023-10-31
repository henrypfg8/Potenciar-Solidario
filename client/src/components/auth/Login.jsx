import { useForm } from 'react-hook-form'
import './auth.css';
import { GoogleLogin} from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useState } from 'react';


const Login = () => {

    const state= useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    useEffect(() => {
       
    }, [])
    console.log(state)

    const onSubmit = user => {
         //datos del formulario
        console.log(user);
        //Hacer el dispatch de la acción para iniciar sesión

        // Limpiar el formulario
        reset();
    }
   

    const loginWithGoogle = async (email) => {
        console.log(email);
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
                        {...register('email', {
                            required: true, minLength: 3, maxLength: 40, pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Debes escribir un correo válido"
                            }
                        })}
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
                <div className='auth__links'>
                    <p>¿No tienes Cuenta? <a href="/register">Crear Cuenta</a></p>
                    <div className='auth__google'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse)
                                const user = jwtDecode(credentialResponse.credential)
                                loginWithGoogle(user.email)
                            }}
                            
                            onError={(error) => {
                                console.log(error);
                                console.log('Login Failed');
                            }}
                            useOneTap       
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
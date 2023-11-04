import { useForm } from 'react-hook-form'
import './auth.css';
import { GoogleLogin } from '@react-oauth/google'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginWithGoogleAction } from '../../Redux/auth/AuthActions';
import { useEffect, useState } from 'react';


const Login = () => {


    const { isAuthenticated } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorLoginWithGoogle, setErrorLoginWithGoogle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (isAuthenticated || token) {
            navigate('/')
        }

    }, [isAuthenticated]);

    //Login
    const login = user => {
        //datos del formulario
        //Hacer el dispatch de la acción para iniciar sesión
        dispatch(loginUser(user.email, user.password))
            .then(() => {
                navigate('/');
                setErrorLogin(false);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorLogin(true);
            })

        // Limpiar el formulario
        reset();
    }

    //Login con Google
    const loginWithGoogle = async token => {
        dispatch(loginWithGoogleAction(token)) //Hacer el dispatch de la acción para iniciar sesión con google
            .then((data) => {
                if (data === undefined || data === null === !data) {
                    setErrorLoginWithGoogle(true);
                    return;
                }
                navigate('/');
                setErrorLoginWithGoogle(false);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorLoginWithGoogle(true);
            })

    }

    return (
        <div className='auth__container' >
            <form action="" method='post' onSubmit={handleSubmit(login)} className='auth__form' autoCorrect='off'>
                {/* campo para el email */}
                <h1 className='auth__title'>Iniciar Sesión</h1>
                {errorLogin && <p className='auth__error'>Correo o contraseña incorrectos</p>}
                {errorLoginWithGoogle && <p className='auth__error'>Tu cuenta aún no esta registrada</p>}
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
                            onSuccess={async credentialResponse => {
                                loginWithGoogle(credentialResponse)
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
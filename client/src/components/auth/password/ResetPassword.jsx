import axios from 'axios';
import Styles from './reset.module.css'
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swiper from '../../Form/Swiper';


const ResetPassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm(); // Configuración del hook form
    const [successPasswordUpdate, setSuccessPasswordUpdate] = useState(false); // Estado para mostrar el mensaje de éxito
    const [errorPasswordUpdate, setErrorPasswordUpdate] = useState(false); // Estado para mostrar el mensaje de error
    const navigate = useNavigate();
    let [searchParams] = useSearchParams(); // Obtener los parámetros de la url
    const token = searchParams.get('token');

    // Función para actualizar la contraseña
    const handleUpdatePassword = async newPassword => { 
        try{
            const { data } = await axios.put('http://localhost:19789/resetpassword', { newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            setSuccessPasswordUpdate(true);
            setErrorPasswordUpdate(false);
            setTimeout(() => {
                setSuccessPasswordUpdate(false);
                navigate('/login');
            }, [3000]);

            return data;
        }
        catch(error){
            console.log(error.response)
            setErrorPasswordUpdate(true);
            setTimeout(() => {
                setErrorPasswordUpdate(false);
            }, [3000])
        }
    }

    // Función para enviar el formulario
    const onSubmit = async data => {
      await  handleUpdatePassword(data.password);
    };

    return (
        <div className={Styles.password__container}>
            {successPasswordUpdate && <Swiper frase='Tu Contraseña se actualizo correctamente, Ahora inicia sesión' tipo='success' color='#005692'/>}
            {errorPasswordUpdate && <Swiper frase='Hubo un error al actualizar tu contraseña, intenta nuevamente' tipo='error' color='#ff0000'/>}
            <form className={Styles.password__container} onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.password__field}>
                    <label className={Styles.password__label} htmlFor="password">Escribe tu nueva contraseña</label>
                    {errors.password && <p className={Styles.password__error}>{errors.password.message}</p>}
                    <input className={Styles.password__input}
                        type="password"
                        placeholder='Escribe tu nueva contraseña'
                        id='password'
                        {...register('password', {
                            required: 'Este campo es requerido',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            },
                            maxLength: {
                                value: 50,
                                message: 'La contraseña no puede tener más de 50 caracteres'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+$/,
                                message: 'Debes escribir una contraseña válida'
                            }
                        })}
                    />
                   
                </div>
                <div  className={Styles.password__field}>
                    <label className={Styles.password__label} htmlFor="password2">Vuelve a escribir tu contraseña</label>
                    {errors.password2 && <p  className={Styles.password__error}>{errors.password2.message}</p>}
                    <input
                        className={Styles.password__input}
                        type="password"
                        placeholder='Confirma tu nueva contraseña'
                        id='password2'
                        {...register('password2', {
                            required: 'Este campo es requerido',
                            validate: {
                                matchesPreviousPassword: value => {
                                    const { password } = getValues();
                                    return password === value || 'Las contraseñas no coinciden';
                                }
                            }
                        })}
                    />
                    
                </div>

                <button className={Styles.password__button__ok} type='submit'>Restablecer contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;

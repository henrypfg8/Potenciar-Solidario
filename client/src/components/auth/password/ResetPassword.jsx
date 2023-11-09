import axios from 'axios';
import Styles from './reset.module.css'
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swiper from '../../Form/Swiper';


const ResetPassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [successPasswordUpdate, setSuccessPasswordUpdate] = useState(false);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const token = searchParams.get('token');


    const handleUpdatePassword = async (newPassword) => {
        try{
            const { data } = await axios.put('http://localhost:19789/resetpassword', { newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setSuccessPasswordUpdate(true);
                setTimeout(() => {
                    setSuccessPasswordUpdate(false);
                    navigate('/login')
                }, 3000)
            })
            .catch(error => {
                console.log(error.response)
            })
            return data
        }
        catch(error){
            console.log(error.response)
        }
    }

    const onSubmit = data => {
        // Aquí manejas el envío del formulario
        handleUpdatePassword(data.password);
    };

    return (
        <div className={Styles.reset__container}>
            {successPasswordUpdate && <Swiper frase='Tu Contraseña se actualizo correctamente, Ahora inicia sesión' tipo='success' color='#005692'/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={Styles.email__label} htmlFor="password">Escribe tu nueva contraseña</label>
                    <input className={Styles.email__input}
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
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label className={Styles.email__label} htmlFor="password2">Vuelve a escribir tu contraseña</label>
                    <input
                        className={Styles.email__input}
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
                    {errors.password2 && <p>{errors.password2.message}</p>}
                </div>

                <button className={Styles.password__button__ok} type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default ResetPassword;

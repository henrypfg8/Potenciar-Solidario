import axios from 'axios';
import { useState } from 'react';
import { useForm, } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Styles from './reset.module.css'

const Email = () => {
    const { register, handleSubmit,formState : {errors} } = useForm();
    const [successEmail, setSuccessEmail] = useState(false);
    const navigate = useNavigate();

    const handleSendEmail = async (email) => {
        const  {data} = await axios.put('http://localhost:19789/forgotpassword', email);
        console.log(data)
    };


    const onsubmit =  handleSubmit((data) => {
        handleSendEmail(data);
        setSuccessEmail(true);
        setTimeout(() => {
            setSuccessEmail(false);
            navigate('/login')
        }, 9000)

    });
    
    return (
        <div>

            {successEmail ? 
            
            <div className={Styles.email__container}>
                <h3>Se ha enviado un correo a tu bandeja de entrada</h3>
                <button className={Styles.email__button__ok} 
                    onClick={() => {setSuccessEmail(false)
                                    navigate('/login')}}>OK</button>
            </div>
             : <div  className={Styles.email__container}>
                <form method='post' onSubmit={onsubmit} >
                    <div style={{width : '400px'}}>
                        <label className={Styles.email__label} htmlFor="email">Escribe tu correo</label>
                        {errors?.email?.type === 'required' && <p style={{color : '#ff0000'}}>Este campo es requerido</p>}
                        {errors?.email?.type === 'pattern' && <p style={{color : '#ff0000'}}>Debes escribir un correo válido</p>}
                        <input
                            className={Styles.email__input}
                            type='email'
                            placeholder='Ej. pedro@lopez.com'
                            id='email'
                            {...register('email', {
                                required: true, pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    message: 'Debes escribir un correo válido'

                                }
                            })}
                        />
                    </div>
                    <button className={Styles.email__button} type='submit'>Enviar</button>
                </form>
            </div>}
        </div>
    )
}

export default Email
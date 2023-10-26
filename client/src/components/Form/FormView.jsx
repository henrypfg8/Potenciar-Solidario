/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom';

const FormView = ({ pulication,setPublication }) => {


    if (pulication === undefined) return null; // Si no hay datos retornar null
    const handleDeleteImage = () => {
        // Eliminar la imagen
        setPublication({
            ...pulication,
            image: '',
            imagePreview: null
        
        })
    }
    return (
        <div className='publication__container'>
            <h1 className='publication__title'>{pulication.title}</h1>
            {pulication.imagePreview !== null ? ( // Si hay imagen mostrarla
               <div>
                     <img src={`${pulication.imagePreview}`} className='publication__image' />
                     <button className='publication__btn--delete'
                        onClick={ handleDeleteImage}>Eliminar</button>
               </div>
            ) : (<div className='publication__image--none'>La Imagen Aparecerá Aquí</div>)}  {/* si no se selecciona una imagen, se agregará un mensaje*/}
            <p></p>
            <div className='publication__date'>
                <p >{pulication.startDate && 'Fecha de inicio: '}<span>{pulication.startDate}</span></p>
                <p >{pulication.endDate && 'Fecha de finalización: '}<span>{pulication.endDate}</span></p>
            </div>
            <p className='publication__category'> {pulication.category}</p>
            <p className='publication__description'>{pulication.description}</p>
            <p className='publication__contact'>{pulication.contact && 'Contacto: '}<span>{pulication.contact}</span></p>
            <p className='publication__p'>{pulication.organization && 'Nombre de la organización: '}<span>{pulication.organization}</span></p>
            <p className='publication__p'>{pulication.linkInscription && 'Enlace para la inscripción: '} <span  className='pulication__link'>{pulication.linkInscription}</span> </p>
            {pulication.url && (
                <div className='publication__btn'>
                    <Link to={`${pulication.url}`}>Más infomación</Link>
                </div>
            )}

        </div>
    )
}

export default FormView
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom';

const FormView = ({ post, setPost }) => {


    if (post === undefined) return null; // Si no hay datos retornar null
    const handleDeleteImage = () => {
        // Eliminar la imagen
        setPost({
            ...post,
            image: '',
            imagePreview: null
        
        })
    }
    return (
        <div className='publication__container'>
            <h1 className='publication__title'>{post.title}</h1>
            {post.imagePreview !== null ? ( // Si hay imagen mostrarla
               <div>
                     <img src={`${post.imagePreview}`} className='publication__image' />
                     <button className='publication__btn--delete'
                        onClick={ handleDeleteImage}>Eliminar</button>
               </div>
            ) : (<div className='publication__image--div'>
                <p className='publication__image--none'>La imagen aparecerá aquí</p>
            </div>)}  {/* si no se selecciona una imagen, se agregará un mensaje*/}
            <p></p>
            <div className='publication__date'>
                <p >{post.startDate && 'Fecha de inicio: '}<span>{post.startDate}</span></p>
                <p >{post.endDate && 'Fecha de finalización: '}<span>{post.endDate}</span></p>
            </div>
            <p className='publication__category'> {post.category}</p>
            <p className='publication__description'>{post.description}</p>
            <p className='publication__contact'>{post.contact && 'Contacto: '}<span>{post.contact}</span></p>
            <p className='publication__p'>{post.organization && 'Nombre de la organización: '}<span>{post.organization}</span></p>
            <p className='publication__p'>{post.linkInscription && 'Enlace para la inscripción: '} <span  className='post__link'>{post.linkInscription}</span> </p>
            {post.url && (
                <div className='publication__btn'>
                    <Link to={`${post.url}`}>Más infomación</Link>
                </div>
            )}

        </div>
    )
}

export default FormView
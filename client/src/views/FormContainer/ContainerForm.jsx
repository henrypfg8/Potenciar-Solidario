
import { useState } from 'react';
import Form from '../../components/Form/Form'
import FormView from '../../components/Form/FormView';
import './container.css'
//import { Navigate } from 'react-router-dom';

const ContainerForm = () => {
    const [post, setPost] = useState({
        title: '',
        category: '',
        description: '',
        startDate: '',
        endDate: '',
        image: '',
        creationDate: '',
        imagePreview: null,
        contact: '',
        status: false,
        organization: '',
        linkInscription: '',
        url: '',
    });
    // const handleClose = () => {
    //     //Navigate('/') // Navegar a la ruta especificada
    // }
    return (
        <>   
        {/* <div>
            <button className='btnClose' onClick={handleClose}>X</button>
        </div> */}
            <div className='container'>

            <Form
                setPost={setPost}
                post={post} />
            <FormView
                post={post}
                setPost={setPost} />
        </div>
        </>

    )
}

export default ContainerForm
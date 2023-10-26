
import { useState } from 'react';
import Form from '../../components/Form/Form'
import FormView from '../../components/Form/FormView';
import './container.css'
//import { Navigate } from 'react-router-dom';

const ContainerForm = () => {
    const [pulication, setPublication] = useState({
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
    const handleClose = () => {
        //Navigate('/') // Navegar a la ruta especificada
    }
    return (
        <>   
        <div>
            <button className='btnClose' onClick={handleClose}>X</button>
        </div>
            <div className='container'>

            <Form
                setPublication={setPublication}
                pulication={pulication} />
            <FormView
                pulication={pulication} />
        </div>
        </>

    )
}

export default ContainerForm
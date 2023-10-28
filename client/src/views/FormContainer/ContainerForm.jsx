
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
        registrationLink: '',
        url: '',
    });
 
    return (
        <>   
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
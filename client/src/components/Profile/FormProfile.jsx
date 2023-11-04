import { useState } from 'react';
import { Button, Modal, } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../Redux/auth/AuthActions';
import proptypes from 'prop-types'
import PhoneInput from 'react-phone-number-input';
import Select from 'react-select';
import { getCodeList } from 'country-list';


const FormProfile = ({ userProfile, setSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, formState: { errors }, handleSubmit, control } = useForm();

    const dispatch = useDispatch();
    // Opciones para el select de paises
    const countries = Object.values(getCodeList());
    const options = countries.map((country) => (
        { value: country, label: country }
    ))
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSubmit = handleSubmit((data) => {
        dispatch(updateProfile(userProfile.id, { ...data, password: userProfile.password }))
            .then(() => {
                setIsModalOpen(false);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.response.data)
                setSuccess(false)
            })
    })
    return (
        <>
            <Button style={{
                backgroundColor: '#fff',
                color: '#005692',
                border: '1px solid #005692',
                marginTop: '2rem'

            }} onClick={showModal}>
                Editar perfil
            </Button>

            <Modal title="Actualiza tu datos" open={isModalOpen} onCancel={handleCancel} cancelText='Cancelar' cancelButtonProps={{
                style: {
                    backgroundColor: '#fff',
                    color: 'red',
                    border: '1px solid red',
                    width: '100%'
                }
            }} okButtonProps={{
                style: {
                    display: 'none'
                }
            }}>
                <form onSubmit={onSubmit} className='profile__form'>
                    {/* Campo para el nombre */}
                    <div className='profile__field'>
                        <label className='profile__label'>Nombre</label>
                        {/* {errors?.name?.type === 'required' && <p>El nombre es requerido</p>}
                        {errors?.name?.type === 'minLength' && <p>El nombre debe tener al menos 2 caracteres</p>}
                        {errors?.name?.type === 'maxLength' && <p>El nombre debe tener menos de 50 caracteres</p>} */}
                        <input className='profile__input' type="text" name="name"
                            defaultValue={userProfile.name}
                            {...register('name', { required: true, minLength: 2, maxLength: 50 })} />
                    </div>
                    {/* Campo para el apellido */}
                    <div className='profile__field'>
                        <label className='profile__label'>Apellido</label>
                        {/* {errors?.name?.type === 'required' && <p>El nombre es requerido</p>} */}
                        <input className='profile__input' type="text" name="lastname"
                            defaultValue={userProfile.lastname}
                            {...register('lastname', { required: true, minLength: 2, maxLength: 50 })} />
                    </div>
                    {/* Campo para el email */}
                    <div className='profile__field'>
                        <label className='profile__label'>Email</label>
                        <input className='profile__input' type="text" name="email"
                            defaultValue={userProfile.email}
                            {...register('email', { required: true })} />
                    </div>
                    {/* Campo para la fecha de nacimiento */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="birth_date">Fecha de nacimiento</label>
                        <input className='profile__input' type="date"
                            defaultValue={userProfile.birth_date}
                            {...register('birth_date', { required: true })} />
                    </div>
                    {/* campo para el telefono */}
                    <div className='profile__field'>

                        <label className='profile__label' htmlFor="phone">Telefono</label>
                        <Controller
                            name='phone'
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState: { error } }) => {
                                return (
                                    <PhoneInput

                                        {...field}
                                        className='auth__input'
                                        id='phone'
                                        placeholder='Escribe tu número de telefono'
                                        onChange={(e) => {
                                            // Actualiza el valor del formulario
                                            field.onChange(e);
                                        }}
                                        value={field.value}
                                        defaultCountry='AR'
                                    />
                                )
                            }}
                        />
                    </div>
                    {/* Campo para la descripcion */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="description">Descripcion</label>
                        <input className='profile__input' type="text"
                            defaultValue={userProfile.description}
                            {...register('description', { required: true })} />
                    </div >

                    {/* Campo para la ubicacion */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="habitual_location_of_residence">Ubicacion</label>
                        <Controller
                            name="habitual_location_of_residence"
                            control={control}
                            rules={{ required: true }} // Reglas de validación con mensaje de error
                            render={({ field, fieldState: { error } }) => (
                                //console.log(error),
                                <Select
                                    className='auth__input'
                                    {...field}
                                    options={options}
                                    id='habitual_location_of_residence'
                                    onChange={(e) => {
                                        // Actualiza el valor del formulario
                                        field.onChange(e.value);
                                    }}
                                    value={options.find(option => option.value === field.value)}
                                />
                            )}
                        />

                    </div>
                    {/* Campo para la area geografica */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="geographical_area_residence">Area geografica</label>
                        <input className='profile__input' type="text"
                            id='geographical_area_residence'
                            defaultValue={userProfile.geographical_area_residence}
                            {...register('geographical_area_residence', { required: true })} />
                    </div>
                    {/* Campo para el DNI */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="DNI">DNI</label>
                        <input className='profile__input' type="text"
                            id='DNI'
                            defaultValue={userProfile.geographical_area_residence}
                            {...register('DNI', { required: true })} />
                    </div>
                    <button className='profile__btn' type='submit'>Guardar Cambios</button>
                </form>
            </Modal>
        </>
    );
};

FormProfile.propTypes = {
    userProfile: proptypes.object.isRequired,
    success: proptypes.bool.isRequired,
    setSuccess: proptypes.func.isRequired
}
export default FormProfile
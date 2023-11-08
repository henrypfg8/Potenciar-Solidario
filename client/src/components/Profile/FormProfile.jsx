import { useState } from 'react';
import { Button, Modal, } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Redux/auth/AuthActions';
import proptypes from 'prop-types'
import PhoneInput from 'react-phone-number-input';
import Select from 'react-select';
import { getCodeList } from 'country-list';
import { validateAge } from '../../helpers/ValidateAge';
import Swiper from '../Form/Swiper';

const FormProfile = ({ userProfile, setSuccess, success }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, formState: { errors }, handleSubmit, control } = useForm();


    const ongs = useSelector((state) => state.ongsAndCategories.ongs);
    const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
        (nombre) => ({
            label: nombre,
            value: nombre,
            name: "ong",
        })
    );
    const dispatch = useDispatch();
    // Opciones para el select de paises
    const countries = Object.values(getCodeList());
    const options = countries.map((country) => (
        { value: country, label: country }
    ))
    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Función para actualizar los datos del perfil
    const onSubmit = handleSubmit((data) => { // Función para actualizar los datos del perfil
        dispatch(updateProfile(userProfile.id, { ...data, password: userProfile.password }))
            .then(() => {
                setIsModalOpen(false);
                setSuccess(true);
                setTimeout(() => [
                    setSuccess(false)
                ], [3000])
            })
            .catch(error => {
                console.log(error.response.data)
                setSuccess(false)
            })
    })
    return (
        <>
            <Button className='profile__button--update' onClick={showModal}>
                Editar perfil
            </Button>
            {success && <Swiper frase='Se actualizo correctamente' color='#005692' tipo='success' />}
            <Modal
                title="Actualiza tu datos"
                open={isModalOpen}
                onCancel={handleCancel}
                cancelText='Cancelar'
                cancelButtonProps={{
                    style: { backgroundColor: '#fff', color: 'red', border: '1px solid red', width: '100%' }
                }}
                okButtonProps={{ style: { display: 'none' } }}>

                {/* Formulario para actualizar los datos del perfil */}
                <form onSubmit={onSubmit} className='profile__form'>
                    {/* Campo para el nombre */}
                    <div className='profile__field'>
                        <label className='profile__label'>Nombre</label>
                        <div>
                            {errors?.name?.type === 'required' && <p className='profile__alert'>El nombre es requerido</p>}
                            {errors?.name?.type === 'minLength' && <p className='profile__alert'>El nombre debe tener al menos 2 caracteres</p>}
                            {errors?.name?.type === 'maxLength' && <p className='profile__alert'>El nombre debe tener menos de 50 caracteres</p>}
                            <input className='profile__input' type="text" name="name"
                                defaultValue={userProfile.name}
                                {...register('name', { required: true, minLength: 2, maxLength: 50 })} />
                        </div>

                    </div>
                    {/* Campo para el apellido */}
                    <div className='profile__field'>
                        <label className='profile__label'>Apellido</label>
                        <div>
                            {errors?.lastname?.type === 'required' && <p className='profile__alert'>El apellido es requerido</p>}
                            {errors?.lastname?.type === 'minLength' && <p className='profile__alert'>El apellido debe tener al menos 2 caracteres</p>}
                            {errors?.lastname?.type === 'maxLength' && <p className='profile__alert'>El apellido debe tener menos de 50 caracteres</p>}
                            <input className='profile__input' type="text" name="lastname"
                                defaultValue={userProfile.lastname}
                                {...register('lastname', { required: true, minLength: 2, maxLength: 50 })} />
                        </div>

                    </div>
                    {/* Campo para el email */}
                    <div className='profile__field'>
                        <label className='profile__label'>Email</label>
                        <div>
                            {errors?.email?.type === 'required' && <p className='profile__alert'>El email es requerido</p>}
                            {errors?.email?.type === 'pattern' && <p className='profile__alert'>El email debe ser valido</p>}
                            <input className='profile__input' type="text" name="email"
                                defaultValue={userProfile.email}
                                {...register('email', {
                                    required: true, pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                    }
                                })} />

                        </div>

                    </div>
                    {/* Campo para la fecha de nacimiento */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="birth_date">Fecha de nacimiento</label>
                        <div>
                            <div>
                                {errors?.birth_date?.type === 'required' && <p className='profile__alert'>La fecha de nacimiento es requerida</p>}
                                {errors?.birth_date?.type === 'validate' && <p className='profile__alert'>Debes ser mayor de 18 años</p>}
                                <input className='auth__input'
                                    id='birth_date'
                                    defaultValue={userProfile.birth_date}
                                    type="date"
                                    {...register('birth_date', {
                                        required: true,
                                        validate: validateAge
                                    })} />
                            </div>
                        </div>
                    </div>
                    {/* campo para el telefono */}
                    <div className='profile__field'>

                        <label className='profile__label' htmlFor="phone">Telefono</label>
                        <div>
                            {errors?.phone?.type === 'required' && <p className='profile__alert'>El telefono es requerido</p>}
                            {errors?.phone?.type === 'maxLength' && <p className='profile__alert'>El telefono debe tener menos de 15 digitos</p>}
                            <Controller
                                name='phone'
                                control={control}
                                rules={{ required: true, maxLength: 15 }}
                                defaultValue={userProfile.phone}
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
                                            limitMaxLength={true}
                                            defaultCountry='AR'
                                            international
                                            countryCallingCodeEditable={false}
                                           
                                        />
                                    )
                                }}
                            />
                        </div>
                    </div>
                    {/* Campo para la descripcion */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="description">Descripcion</label>
                        <div>
                            {errors?.description?.type === 'required' && <p className='profile__alert'>La descripcion es requerida</p>}
                            <input className='profile__input' type="text"
                                defaultValue={userProfile.description}
                                {...register('description', { required: true })} />
                        </div>
                    </div >

                    {/* Campo para la ubicacion */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="habitual_location_of_residence">Ubicacion</label>
                        <div>
                            {errors?.habitual_location_of_residence?.type === 'required' && <p className='profile__alert'>La ubicacion es requerida</p>}
                            <Controller
                                name="habitual_location_of_residence"
                                control={control}
                                rules={{ required: true }} // Reglas de validación con mensaje de error
                                defaultValue={userProfile.habitual_location_of_residence}
                                render={({ field, fieldState: { error } }) => (
                                    //console.log(error),
                                    <Select /// Componente de React Select
                                        className='auth__input'
                                        {...field}
                                        options={options}
                                        id='habitual_location_of_residence'
                                        onChange={(e) => {
                                            // Actualiza el valor del formulario
                                            field.onChange(e.value);
                                        }}
                                        defaultInputValue={userProfile.habitual_location_of_residence} // Valor inicial del input
                                        value={options.find(option => option.value === field.value)} // Valor seleccionado
                                    />
                                )}
                            />
                        </div>

                    </div>
                    {/* Campo para la area geografica */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="geographical_area_residence">Area de localización</label>
                        <input className='profile__input' type="text"
                            id='geographical_area_residence'
                            defaultValue={userProfile.geographical_area_residence}
                            {...register('geographical_area_residence', { required: false })} /> 
                            
                    </div>
                    {/* Campo para el DNI */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="DNI">DNI</label>
                        <div>
                            {errors?.DNI?.type === 'required' && <p className='profile__alert'>El DNI es requerido</p>}
                            {errors?.DNI?.type === 'minLength' && <p className='profile__alert'>El DNI debe tener al menos 5 caracteres</p>}
                            {errors?.DNI?.type === 'maxLength' && <p className='profile__alert'>El DNI debe tener menos de 8 caracteres</p>}

                            <input className='profile__input' type="text"
                                id='DNI'
                                defaultValue={userProfile.DNI}
                                {...register('DNI', { required: true, minLength: 5, maxLength: 8 })} />
                        </div>
                    </div>
                    {/* Campo para el DNI */}
                    <div className='profile__field'>
                        <label className='profile__label' htmlFor="DNI">Organización</label>
                        <div>
                            {errors?.organization?.type === 'required' && <p className='profile__alert'>La organización es requerida</p>}
                            {errors?.organization?.type === 'minLength' && <p className='profile__alert'>La organización debe tener al menos 2 caracteres</p>}
                            <Controller
                                name='organization'
                                rules={{ required: true, minLength: 2, }}
                                control={control}
                                defaultValue={userProfile.organization}
                                render={({ field, fieldState: { error } }) => {
                                    return <Select
                                    
                                        {...field}
                                        className='auth__input'
                                        options={ongOptions}
                                        id='organization'
                                        onChange={(e) => {
                                            // Actualiza el valor del formulario
                                            field.onChange(e.value);

                                        }}
                                        value={ongOptions.find(option => option.value === field.value)}

                                    />
                                }}

                            />
                        </div>
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
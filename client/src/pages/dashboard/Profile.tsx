import React from 'react';
import Form from '../../components/Form';
import Wrapper from '../../styles/DashboardFormPage.style';
import * as yup from "yup";
import { UpdatedUserInfo } from '../../models';
import FormInputField from '../../components/FormInputField';
import Alert from '../../components/Alert';
import { useAppContext } from '../../context/appContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user, showAlert, updateUser, isLoading } = useAppContext();
    if (!user) return <Navigate to="/" />;
    const initialValues: UpdatedUserInfo = {
        name: user.name as string,
        email: user.email as string,
        location: user.location as string,
        lastName: user.lastName as string,
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Please provide name'),
        email: yup.string().required('Please provide email'),
        location: yup.string().required('Please provide location'),
        lastName: yup.string().required('Please provide name'),
    })

    const handleSubmit = (values: UpdatedUserInfo) => {
        updateUser(values)
    }
    
    return (
        <Wrapper>
            <Form
                defaultValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                className="form"
            >
                <h3>Profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormInputField type='text' label="Name" name="name" />
                    <FormInputField type='email' label='Email' name="email" />
                    <FormInputField type='text' label="Location" name="location" />
                    <FormInputField type='text' label="Last Name" name="lastName" />
                    <button type='submit' className='btn btn-block' disabled={isLoading} >
                        {isLoading ? 'Please wait...' : 'Save Changes'}
                    </button>
                </div>
            </Form>

        </Wrapper>
    )
}

export default Profile
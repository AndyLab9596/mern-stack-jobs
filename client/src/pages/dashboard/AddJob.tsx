import React from 'react'
import Alert from '../../components/Alert';
import FormInputField from '../../components/FormInputField';
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../styles/DashboardFormPage.style';
import * as yup from "yup";
import { IJobAdd } from '../../models';
import Form from '../../components/Form';
import FormSelectField from '../../components/FormSelectField';
import ButtonGroup from '../../components/ButtonGroup';


const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isLoading,
        createJob,
        updateJob
    } = useAppContext();

    const initialValues: IJobAdd = {
        position,
        company,
        jobLocation,
        status,
        jobType,
    }

    const validationSchema = yup.object().shape({
        position: yup.string().required('Please provide position'),
        company: yup.string().required('Please provide company'),
        jobLocation: yup.string().required('Please provide job location'),
        status: yup.string().required('Please provide status'),
        jobType: yup.string().required('Please provide job type'),
    })

    const handleSubmit = (values: IJobAdd) => {
        if (isEditing) {
            // edit job
            updateJob();
            return;
        }
        createJob(values)
    }

    return (
        <Wrapper>
            <Form
                defaultValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                className="form"
            >
                <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormInputField type='text' label="Position" name="position" />
                    <FormInputField type='text' label='Company' name="company" />
                    <FormInputField type='text' label="Job Location" name="jobLocation" />
                    <FormSelectField label='Status' name='status' options={statusOptions} />
                    <FormSelectField label='Job Type' name='jobType' options={jobTypeOptions} />
                    <ButtonGroup isLoading={isLoading} />
                </div>
            </Form>

        </Wrapper>
    )
}

export default AddJob
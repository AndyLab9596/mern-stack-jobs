import React from 'react'
import { useFormContext } from 'react-hook-form'

interface ButtonGroupProps {
    isLoading: boolean
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ isLoading }) => {
    const { reset } = useFormContext();
    return (
        <div className='btn-container'>
            <button type='submit' className='btn btn-block' disabled={isLoading} >
                {isLoading ? 'Please wait...' : 'Save Changes'}
            </button>
            <button type="button" className='btn btn-block btn-reset' onClick={() => reset()} >
                Clear
            </button>
        </div>
    )
}

export default ButtonGroup
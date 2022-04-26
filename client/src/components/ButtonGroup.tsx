import React from 'react';
import { useAppContext } from '../context/appContext';

interface ButtonGroupProps {
    isLoading: boolean
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ isLoading }) => {
    const { clearValues } = useAppContext()
    return (
        <div className='btn-container'>
            <button type='submit' className='btn btn-block' disabled={isLoading} >
                {isLoading ? 'Please wait...' : 'Save Changes'}
            </button>
            <button type="button" className='btn btn-block btn-reset' onClick={() => clearValues()} >
                Clear
            </button>
        </div>
    )
}

export default ButtonGroup
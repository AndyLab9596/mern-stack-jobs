import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

interface IProtectedRoute {
    children: ReactNode
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
    const { user } = useAppContext();

    if (!user) {
        return <Navigate to="/landing" />
    }

    return (
        <>
            {children}
        </>

    )
}

export default ProtectedRoute
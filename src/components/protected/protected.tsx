import React from 'react';
import { Navigate } from "react-router-dom";

type Props = {
    condition: boolean;
    children: React.ReactElement;
    navigateTo: string
};

export const ProtectedRoute: React.FC<Props> = ({ condition, children, navigateTo }) => {
    if (!condition) {
        return <Navigate to={navigateTo} replace/>;
    }
        
    return <>{children}</>;
};
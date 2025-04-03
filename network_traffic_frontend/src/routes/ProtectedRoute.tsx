import { useAuth } from '@/context/UseAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    requiredRole: string[];
};

export const ProtectedRoute = ({ children, requiredRole }: Props) => {
    const location = useLocation();
    const { user, role, isLoggedIn, isReady } = useAuth();

    if (!isReady) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn() && requiredRole.includes(role!.role) && user ) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
};

export default ProtectedRoute;
import React from 'react';
import { useAuth } from '@/context/user-authentication';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingPage } from '@/pages/loading/loading-page';

type Props = {
    children: React.ReactNode;
    requiredRole: string[];
};

export const ProtectedRoute = ({ children, requiredRole }: Props) => {
    const location = useLocation();
    const { user, role, isLoggedIn, isReady } = useAuth();

    if (!isReady) {
        return <LoadingPage />;
    }

    if (isLoggedIn() && requiredRole.includes(role!.role) && user ) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
};

export default ProtectedRoute;
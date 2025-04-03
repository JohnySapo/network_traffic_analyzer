import axios from "axios";

export type ErrorResponse = {
    status: number;
    error: string;
    message: string;
};

export const handleErrorResponse = (error: any): never => {
    if (axios.isAxiosError(error) && error.response) {
        const captured: ErrorResponse = error.response.data;
        throw new Error(captured.message);
    }
    throw new Error("Something went wrong. Please try again later.");
};